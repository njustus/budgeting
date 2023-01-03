import {
  type AppState,
  generateStateKey,
  type StockInfo,
  type Tag,
  type Transaction,
  TransactionRecurrence,
  TransactionType,
  zero,
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
    appState.transactions = appState.transactions.map((x: Transaction) => ({...x, date: new Date(x.date)}))
    appState.stateKey =  appState.stateKey || generateStateKey()
    appState.lastSynced = appState.lastSynced ? new Date(appState.lastSynced) : null
    appState.depot = appState.depot || zeroDepot

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
    }
  },
  getters: { //TODO should all be memoized
    totalTransactions(state: AppState): Transaction[] {
      function expandTransaction(transaction: Transaction, today: Date) {
        function repeatTransaction(timeframe: Date[]) {
          return timeframe.map(month => ({
            ...transaction,
            date: new Date(month.getFullYear(), month.getMonth(), transaction.date.getDate())
          }))
        }

        const interval = {start: transaction.date, end: today}

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
      const rangeFilter = (t: Transaction) => isWithinInterval(t.date, {
        start: state.transactionRange.start ? state.transactionRange.start : 0,
        end: state.transactionRange.end
      })

      return this.totalTransactions
        .sort((x, y) => x.date.getTime() - y.date.getTime())
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
    }
  }
})
