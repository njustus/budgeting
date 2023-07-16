import {
  type Account,
  type AppState,
  generateStateKey,
  type StockInfo,
  type SubscribedStock,
  type Tag,
  type Transaction,
  TransactionRecurrence,
  TransactionType,
  zero,
  zeroAccount,
  zeroDepot
} from '@/models'
import {defineStore} from 'pinia'
import {eachMonthOfInterval, eachQuarterOfInterval, eachYearOfInterval, isWithinInterval} from 'date-fns'
import * as R from "ramda";
import {v4} from "uuid"

export const useAppStore = defineStore('app-state', {
  state: (): AppState => {
    const item = localStorage.getItem('state')
    const appState = item ? JSON.parse(item) : zero()
    appState.transactionRange = {
      start: appState.transactionRange.start ? new Date(appState.transactionRange.start) : null,
      end: new Date(appState.transactionRange.end),
    }
    appState.transactions = appState.transactions.map((x: Transaction) => ({
      ...x,
      startDate: new Date(x.startDate),
      endDate: x.endDate ? new Date(x.endDate) : null
    }))

    appState.stateKey =  appState.stateKey || generateStateKey()
    appState.lastSynced = appState.lastSynced ? new Date(appState.lastSynced) : null
    appState.depot = appState.depot || zeroDepot
    appState.deposits = appState.deposits || []

    return appState
  },
  actions: {
    addTransaction(t: Transaction) {
      this.transactions.push(t);
    },

    addTag(newTag: Tag) {
      const existingTag = this.tags.find(t2 => t2.name === newTag.name)
      if(existingTag) {
        existingTag.color = newTag.color
      } else {
        this.tags.push(newTag)
      }
    },

    deleteTransaction(t: Transaction) {
      this.transactions = this.transactions.filter(tx => tx.id !== t.id);
    },

    addStock(stockDetails:StockInfo, count:number) {
      this.depot.subscribedStocks.push({
        id: v4(),
        count,
        isin: stockDetails.isin,
        stockInfo: stockDetails
      })
    },
    deleteStockById(id: string) {
      this.depot.subscribedStocks = this.depot.subscribedStocks.filter(st => st.id !== id)
    },

    updateStockExchanges(stockInfo: StockInfo[]) {
      const stockByIsin = (isin: string) => this.depot.subscribedStocks.find(x => x.isin === isin)

      stockInfo.forEach(stockInfo => {
        const subscribedStock = stockByIsin(stockInfo.isin)
        if(subscribedStock) {
          subscribedStock.stockInfo = stockInfo
        }
      })
    },

    updateDeposit(balance:number) {
      this.deposits.push({
        balance,
        timestamp: new Date()
      })
    }
  },
  getters: { //TODO should all be memoized
    totalTransactions(state: AppState): Transaction[] {
      function expandTransaction(transaction: Transaction, today: Date) {
        function repeatTransaction(timeframe: Date[]) {
          return timeframe.map(month => ({
            ...transaction,
            startDate: new Date(month.getFullYear(), month.getMonth(), transaction.startDate.getDate())
          }))
        }

        const interval = {start: transaction.startDate, end: transaction.endDate || today}

        switch (transaction.recurrence) {
          case TransactionRecurrence.yearly:
            return repeatTransaction(eachYearOfInterval(interval))
          case TransactionRecurrence.monthly:
            return repeatTransaction(eachMonthOfInterval(interval))
          case TransactionRecurrence.quaterly:
            return repeatTransaction(eachQuarterOfInterval(interval))
          case TransactionRecurrence.once:
            return [transaction]
        }
      }

      return state.transactions.flatMap(t => expandTransaction(t, state.transactionRange.end))
    },

    sortedTransactions(state: AppState): Transaction[] {
      const rangeFilter = (t: Transaction) => isWithinInterval(t.startDate, {
        start: state.transactionRange.start ? state.transactionRange.start : 0,
        end: state.transactionRange.end
      })

      return this.totalTransactions
        .sort((x, y) => x.startDate.getTime() - y.startDate.getTime())
        .filter(rangeFilter)
    },

    totalBalance(state: AppState): number {
      const totalAmount = (t:Transaction) => t.type === TransactionType.Income ? t.amount : -t.amount

      return this.totalTransactions
        .map(totalAmount)
        .reduce((x, y) => x + y, 0)
    },

    availableTags(state: AppState): Tag[] {
      return state.tags
    },

    runningSum(state: AppState): number[] {
      const sums: number[] = []

      //TODO intermediate sums per month
      this.sortedTransactions.forEach((currentTx: Transaction) => {
        const prevSum = sums.length <= 0 ? 0 : sums[sums.length - 1]
        const currentAmount = currentTx.type === TransactionType.Expense ? -currentTx.amount : currentTx.amount
        sums.push(prevSum + currentAmount)
      })

      return sums
    },

    depotBalance(state: AppState): number {
      return R.sum(state.depot.subscribedStocks.map(stock => stock.count*stock.stockInfo.exchange.price))
    },

    depotLastUpdate(state: AppState): Date {
      if (state.depot.subscribedStocks.length <= 0) {
        return new Date()
      }

      const sortByTimestamp = (a: SubscribedStock, b: SubscribedStock) =>
        new Date(a.stockInfo.exchange.timestamp).getTime() - new Date(b.stockInfo.exchange.timestamp).getTime()

      const sortedStocks = state.depot.subscribedStocks.sort(sortByTimestamp).reverse()
      return sortedStocks[0].stockInfo.exchange.timestamp
    },

    deposit(state: AppState): Account {
      return (state.deposits.length > 0) ?
        state.deposits[state.deposits.length - 1] : zeroAccount
    }
  }
})
