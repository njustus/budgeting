import { createFakeTransactions } from "./fake-data"

export interface AppState {
    transactions: Transaction[]
}

export interface Transaction {
    title: string
    description?: string
    amount: number,
    date: Date
}

export function zero(): AppState {
    const transactions = createFakeTransactions()
    return {
        transactions
    }
}