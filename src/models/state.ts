export interface AppState {
    transactions: Transaction[]
}

export interface Transaction {
    title: string
    description?: string
    amount: number
}

export function zero(): AppState {
    return {
        transactions: [
            {title: 'test', amount: 50},
            {title: 'test2', amount: 60.89}
        ]
    }
}