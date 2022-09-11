import type { AppState, Transaction } from '@/models/state'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app-state', {
    state: (): AppState => ({
        transactions: [
            {title: 'test', amount: 50},
            {title: 'test2', amount: 60.89}
        ]
    }),
    actions: {
        addTransaction(t:Transaction) {
            this.transactions.push(t);
        }
    }
})