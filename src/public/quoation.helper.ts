import {QuoationService} from 'node-upbit'

const quoationService = new QuoationService()

interface IGetDayCandles {
  ticker: string
  count: number
}

export const getDayCandles = async ({ticker, count}: IGetDayCandles) => {
  const candles = await quoationService.getDayCandles({
    marketCoin: ticker,
    count,
  })

  return candles
}

export const getMarkets = async (currency: string) => {
  const markets: any = await quoationService.getMarketAllInfo()
  return markets[currency].map((market: any) => market.market)
}

const getTicker = async (market: string) => {
  const ticker = await quoationService.getTicker([market])
  return ticker[0]
}

export const getTop30Markets = async () => {
  const markets = await getMarkets('KRW')
  const tickers: any = []

  // await Promise.all(
  //   markets.map(async (market: any) => {
  //     const ticker = await getTicker(market)
  //     tickers.push(ticker)
  //   }),
  // )

  for (const market of markets) {
    const ticker = await getTicker(market)
    tickers.push(ticker)
  }

  const out = tickers
    .sort((a: any, b: any) => {
      const aValue = a.acc_trade_price
      const bValue = b.acc_trade_price
      return bValue - aValue
    })
    .slice(0, 29)
    .map((ticker: any) => ticker.market)

  return out
}
