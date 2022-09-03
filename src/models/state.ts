export interface AppState {
    transactions: Transaction[]
}

export interface Transaction {
    title: string
    description?: string
    amount: number
}