import type {Axios} from "axios";
import {stocksConfig} from "@/config"
import type {StockExchange, StockInfo} from "@/models"

function parseStockExchange(isin: string, responseData: any): StockExchange {
  return {
    isin,
    price: responseData.PRICE,
    timestamp: new Date(responseData.DATETIME_PRICE)
  }
}

function parseStockInfo(responseData: any): StockInfo {
  return {
    name: responseData.NAME_SECURITY,
    isin: responseData.ID.ISIN,
    wkn: responseData.ID.WKN,
    ter: responseData?.TOTAL_EXPENSE_RATIO
  }
}

export class StocksClient {
  constructor(private readonly axios: Axios) {
  }

  async getExchanges(isin:string): Promise<StockExchange> {
    const result = await this.axios.get(stocksConfig.formatExchangePath(isin))
    const rawData = result.data[0].PriceV2
    return parseStockExchange(isin, rawData)
  }

  async getStockInfo(isin:string): Promise<StockInfo> {
    const result = await this.axios.get(stocksConfig.formatStockInfoPath(isin))
    const rawData = result.data[0].BasicV1
    return parseStockInfo(rawData)
  }
}
