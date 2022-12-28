export interface StockInfo {
  isin: string
  name: string
  wkn: string
  ter?: number
  exchange: StockExchange
}

export interface StockExchange {
  price: number
  timestamp: Date
}

export interface SubscribedStock {
  isin: string
  count: number
}
