import { TransactionType, type AppState, type Tag, type Transaction} from '@/models/state'
import {TransactionRecurrence, zero} from '@/models/state'
import {defineStore} from 'pinia'
import {eachMonthOfInterval, eachQuarterOfInterval, eachYearOfInterval} from 'date-fns'

export const useAppStore = defineStore('app-state', {
    state: (): AppState => {
        const item = localStorage.getItem('state')
        const appState = item ? JSON.parse(item) : zero()
        appState.transactions = appState.transactions.map(x => ({...x, date: new Date(x.date)}))

        return appState
    },
    actions: {
        addTransaction(t:Transaction) {
            this.transactions.push(t);
        }
    },
    getters: { //TODO should all be memoized
        totalTransactions(state: AppState): Transaction[] {
            function expandTransaction(transaction: Transaction, today= new Date()) {
                function repeatTransaction(timeframe: Date[]) {
                    return timeframe.map(month => ({
                        ...transaction,
                        date: new Date(month.getFullYear(), month.getMonth(), transaction.date.getDate())
                    }))
                }

                const interval = {start: transaction.date, end: today}

                switch(transaction.recurrence) {
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

            return state.transactions.flatMap(t => expandTransaction(t))
        },

        sortedTransactions(state: AppState): Transaction[] {
            return this.totalTransactions
                .sort((x,y) => x.date.getTime() - y.date.getTime())
                .reverse()
        },

        totalBalance(state: AppState): number {
            return state.transactions
                .map(x => x.amount)
                .reduce((x,y) => x+y, 0)
        },

        availableTags(state: AppState): Tag[] {
            const uniques = new Set(state.transactions.flatMap(t => t.tags))
            return [...uniques]
        },

        runningSum(state: AppState): number[] {
            const sums: number[] = []

            //TODO intermediate sums per month
            this.sortedTransactions.reverse().forEach((currentTx: Transaction) => {
                const prevSum = sums.length<=0 ? 0 : sums[sums.length-1]
                const currentAmount = currentTx.type===TransactionType.Expense ? -currentTx.amount : currentTx.amount
                sums.push( prevSum + currentAmount )
            })

            return sums.reverse()
        }
    }
})
