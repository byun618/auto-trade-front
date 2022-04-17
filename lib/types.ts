export type Ticker = {
  market: string
  korean_name: string
  english_name: string
}

export type User = {
  name: string
  email: string
  password: string
}

export type UserProgram = {
  _id: string
  user: User
  no: number
  ticker: Ticker
  startTime: number
  timeInterval: number
}
