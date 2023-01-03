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
  id: string
  isin: string
  count: number
  stockInfo: StockInfo
}
