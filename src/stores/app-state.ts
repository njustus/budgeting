import type { AppState, Transaction } from '@/models/state'
import {zero} from '@/models/state'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app-state', {
    state: (): AppState => {
        const item = localStorage.getItem('state')
        return item ? JSON.parse(item) : zero()
    },
    actions: {
        addTransaction(t:Transaction) {
            this.transactions.push(t);
        }
    }
})