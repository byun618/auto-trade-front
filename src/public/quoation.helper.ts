import {QuoationService} from 'node-upbit'

const quoationService = new QuoationService()

interface IGetDayCandles {
  ticker: string
  count: number
}

export const getDayCandles = async ({ticker, count}: IGetDayCandles) => {
  const data = await quoationService.getDayCandles({
    marketCoin: ticker,
    count,
  })

  return data
}
