import {QuoationService} from 'node-upbit'

const quoationService = new QuoationService()

const test = async () => {
  const data = await quoationService.getDayCandles({
    marketCoin: 'KRW-BTC',
    count: 10,
  })

  console.log(data.map((d) => d.candle_date_time_kst))
}

test()
