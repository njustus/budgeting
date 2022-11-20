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

export interface TransactionRange {
    start: Date | null,
    end: Date
}

export interface AppState {
    transactions: Transaction[]
    transactionRange: TransactionRange
}

export interface Transaction {
    id: string
    title: string
    amount: number
    date: Date
    tags: Tag[]
    type: TransactionType
    recurrence: TransactionRecurrence
}

export function zeroTransactionRange(): TransactionRange {
    return {
        start: null,
        end: new Date()
    }
}

export function zero(): AppState {
    const transactions = createFakeTransactions()
    return {
        transactionRange: zeroTransactionRange(),
        transactions
    }
}
