import { createFakeTransactions } from "./fake-data"

export interface Tag {
    name: string
}

export enum TransactionType {
    Expense, Income
}

export enum TransactionRecurrence {
    monthly, quaterly, yearly, once
}

export interface AppState {
    transactions: Transaction[]
}

export interface Transaction {
    title: string
    amount: number
    date: Date
    tags: Tag[]
    type: TransactionType
    recurrence: TransactionRecurrence
}

export function zero(): AppState {
    const transactions = createFakeTransactions()
    return {
        transactions
    }
}
