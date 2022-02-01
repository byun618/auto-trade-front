import {getDayCandles, getMarkets} from './quoation.helper'

// volatility-breakout (단기 변동성 돌파 전략)
interface IVBBackTest {
  candles: any
}

interface IGetExpectRate {
  candles: any
  k: number
}

const getKList = () => {
  const kList: any = []
  const start = 0.05
  const diff = 0.05

  for (let i = start; i < 1; i += diff) {
    kList.push(Math.round(i * 100) / 100)
  }

  return kList
}

/**
 * @description 단기 변동성 돌파 전략 v1
 * 변동성 = 전일 고가 - 전일 저가
 * 매수 목표 가격 = 변동성 * K(노이스 계수)
 * 당일 시세가 목표 가격에 도달하면 매수
 * 당일 종가에 매도
 */
const getExpectRateV1 = ({candles, k}: IGetExpectRate) => {
  const count = candles.length
  let result = 1

  for (let i = 1; i < count; i++) {
    const prevCandle = candles[i - 1]
    const currCandle = candles[i]

    const range = prevCandle.high_price - prevCandle.low_price
    const target = currCandle.opening_price + range * k
    const bought = currCandle.high_price > target
    const incomeRate = bought ? currCandle.trade_price / target : 1

    Object.assign(currCandle, {
      range,
      target,
      bought,
      incomeRate,
    })

    result *= incomeRate
  }

  return result
}

const getExpectRateV2 = (candles: any) => {
  const count = candles.length
  let result = 1

  for (let i = 1; i < count; i++) {
    const prevCandle = candles[i - 1]
    const currCandle = candles[i]

    const range = prevCandle.high_price - prevCandle.low_price
    const noise =
      1 - Math.abs((prevCandle.opening_price - prevCandle.trade_price) / range)
    const target = currCandle.opening_price + range * noise
    const bought = currCandle.high_price > target
    const incomeRate = bought ? currCandle.trade_price / target : 1

    Object.assign(currCandle, {
      range,
      target,
      bought,
      incomeRate,
    })

    result *= incomeRate
  }

  return result
}

export const VBBackTest = async () => {
  const candles = await getDayCandles({ticker: 'KRW-ETH', count: 365})
  // getNoise(candles)

  const expectRate = getExpectRateV1({candles, k: 0.5})
  const expectRate2 = getExpectRateV2(candles)

  console.log(expectRate)
  console.log(expectRate2)

  // const tickers = await getMarkets('KRW')

  // K 값에 따른 예상 수익률 테스트 코드
  // const kList = getKList()

  // const expectRates: any = []
  // for (const k of kList) {
  //   const expectRate = getExpectRateV1({candles, k})
  //   expectRates.push({ticker: candles[0].market, k, expectRate})
  // }
}

export const getNoise = (candles: any) => {
  /**
   * 평균 추세에 따른 돌파계수 설정
   */
  const count = candles.length

  for (let i = 1; i < count; i++) {
    const prevCandle = candles[i - 1]
    // const currCandle = candles[i]

    const range = prevCandle.high_price - prevCandle.low_price
    const noise =
      1 - Math.abs((prevCandle.opening_price - prevCandle.trade_price) / range)

    console.log(noise)
  }
}
