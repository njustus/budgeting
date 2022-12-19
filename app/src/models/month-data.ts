import * as R from 'ramda'
import type {Transaction} from "@/models/state";
import {TransactionType} from "@/models/state";
import {startOfMonth} from "date-fns";

export class MonthData {
  constructor(public readonly label: string,
              public readonly transactions: Transaction[]) {}

  get absoluteAmount(): number {
    return this.transactions.reduce((acc, t) => acc+t.amount, 0)
  }

  get amount(): number {
    return this.transactions.reduce((acc, t) => acc+ ((t.type === TransactionType.Expense) ? -t.amount : t.amount), 0)
  }

  static fromGroup(obj: Record<string, Transaction[]>): MonthData[] {
    return Object.keys(obj).map(key => new MonthData(key, obj[key]))
  }
}

export function generateMonthData(sortedTransactions: Transaction[]): MonthData[] {
  const grouper = (transaction: Transaction): string => {
    return startOfMonth(transaction.date).toDateString()
  }

  const buildGroups = R.groupBy(grouper)
  return MonthData.fromGroup(buildGroups(sortedTransactions))
}
