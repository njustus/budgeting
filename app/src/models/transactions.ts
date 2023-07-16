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

export interface Transaction {
  id: string
  title: string
  amount: number
  startDate: Date
  endDate?: Date
  tags: Tag[]
  type: TransactionType
  recurrence: TransactionRecurrence
  lastUpdate: Date
}

export function zeroTransactionRange(): TransactionRange {
  return {
    start: null,
    end: new Date()
  }
}
