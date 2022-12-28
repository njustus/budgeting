export interface StockInfo {
  isin: string
  name: string
  wkn: string
  ter?: number
}

export interface StockExchange {
  isin: string
  price: number
  timestamp: Date
}
