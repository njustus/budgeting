import type { AppState, Transaction } from '@/models/state'
import {zero} from '@/models/state'
import { defineStore } from 'pinia'

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
    getters: {
        sortedTransactions(state: AppState): Transaction[] {
            return state.transactions
                .sort((x,y) => x.date.getTime - y.date)
                .reverse()
        }
    }
})