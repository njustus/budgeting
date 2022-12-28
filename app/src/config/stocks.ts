function formatPath(path: string, value: string) {
  return path.replace('{isin}', value)
}

export const stocksConfig = {
  _stockInfoPath: "web-financialinfo-service/api/marketdata/etfs?id={isin}&field=BasicV1",
  _exchangeDataPath: "web-financialinfo-service/api/marketdata/etfs?id={isin}&field=PriceV2",
  _stocksUrlPath: "https://www.consorsbank.de/web/Wertpapier/{isin}",

  formatStockInfoPath(isin: string): string {
    return formatPath(stocksConfig._stockInfoPath, isin)
  },

  formatExchangePath(isin: string): string {
    return formatPath(stocksConfig._exchangeDataPath, isin)
  },

  formatStocksUrl(isin: string): string {
    return formatPath(stocksConfig._stocksUrlPath, isin)
  },
}
