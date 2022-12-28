import type {Axios} from "axios";
import {stocksConfig} from "@/config"
import type {StockExchange, StockInfo} from "@/models"

function parseStockExchange(responseData: any): StockExchange {
  return {
    price: responseData.PRICE,
    timestamp: new Date(responseData.DATETIME_PRICE)
  }
}

function parseStockInfo(responseData: any): StockInfo {
  const basicV1 = responseData.BasicV1

  return {
    name: basicV1.NAME_SECURITY,
    isin: basicV1.ID.ISIN,
    wkn: basicV1.ID.WKN,
    ter: basicV1?.TOTAL_EXPENSE_RATIO,
    exchange: parseStockExchange(responseData.PriceV2)
  }
}

export class StocksClient {
  constructor(private readonly axios: Axios) {
  }

  async getStockInfo(isin:string): Promise<StockInfo> {
    const result = await this.axios.get(stocksConfig.formatExchangePath(isin))
    const rawData = result.data[0]
    return parseStockInfo(rawData)
  }
}
