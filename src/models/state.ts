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
    return {
        transactions: [
            {title: 'test', amount: 50, date: new Date(2021,3,5)},
            {title: 'test2', amount: 60.89, date: new Date(2021,2,1)}
        ]
    }
}