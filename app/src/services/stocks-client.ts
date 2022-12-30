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

  async findStockInfo(isin: string): Promise<StockInfo[]> {
    const result = await this.axios.get(stocksConfig.formatExchangePath(isin))
    return result.data.filter((x: any) => x.BasicV1).map(parseStockInfo)
  }

  async getStockInfo(isin: string): Promise<StockInfo> {
    return (await this.findStockInfo(isin))[0]
  }
}
