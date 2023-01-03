import * as R from 'ramda'
import type {SubscribedStock} from "@/models";
import {type Tag, type Transaction, type TransactionRange, zeroTransactionRange} from "@/models";

export interface Account {
  balance: number
  timestamp: Date
}

export interface AppState {
  transactions: Transaction[]
  transactionRange: TransactionRange
  tags: Tag[]
  stateKey: string
  lastSynced?: Date
  isOnline: boolean
  deposits: Account[]

  depot: {
    subscribedStocks: SubscribedStock[]
  }
}


const tags: Tag[] = [
  {name: 'Versicherung', color: 'dodgerblue'},
  {name: 'Abonnement', color: 'teal'},
  {name: 'Miete', color: 'orangered'},
  {name: 'Nebenkosten', color: 'darkorange'},
  {name: 'Kommunikation', color: 'red'},
  {name: 'Hobby', color: 'limegreen'},
  {name: 'Investment', color: 'yellow'},
  {name: 'Gehalt', color: 'forestgreen'},
  {name: 'Bonus', color: 'lightgreen'},
]

export const zeroDepot = {
  subscribedStocks: [] as SubscribedStock[]
}

export function generateStateKey(): string {
  function randomInteger(max: number) {
      return Math.floor(Math.random() * max) + 1;
  }
  return R.range(0, 6).map((_) => randomInteger(9)).join('')
}

export const zeroAccount: Account = {
  balance: 0.0,
  timestamp: new Date()
}

export function zero(): AppState {
  const transactions: Transaction[] = []
  return {
    transactionRange: zeroTransactionRange(),
    transactions,
    tags,
    stateKey: generateStateKey(),
    isOnline: true,
    deposits: [],
    depot: zeroDepot
  }
}
