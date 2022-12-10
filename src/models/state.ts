import { createFakeTransactions } from "./fake-data"

export interface Tag {
    name: string,
    color: string
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
    tags: Tag[]
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

const tags:Tag[] = [
    {name: 'Versicherungen', color: 'dodgerblue'},
    {name: 'Abonnement', color: 'teal'},
    {name: 'Miete', color: 'orangered'},
    {name: 'Nebenkosten', color: 'darkorange'},
    {name: 'Kommunikation', color: 'red'},
    {name: 'Hobby', color: 'limegreen'},
    {name: 'Investment', color: 'yellow'},
    {name: 'Gehalt', color: 'forestgreen'},
    {name: 'Bonus', color: 'lightgreen'},
]

export function zero(): AppState {
    const transactions:Transaction[] = []//createFakeTransactions()
    return {
        transactionRange: zeroTransactionRange(),
        transactions,
        tags
    }
}
