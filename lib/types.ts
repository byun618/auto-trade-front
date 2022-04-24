export type Ticker = {
  market: string
  korean_name: string
  english_name: string
}

export type User = {
  name: string
  email: string
}

export type UserProgram = {
  _id: string
  user: User
  no: number
  ticker: Ticker
  startTime: number
  timeInterval: number
  buyTime?: string
  sellTime?: string
  started?: boolean
  targetPrice?: number
  isHold?: boolean
  isSell?: boolean
}

export type Log = {
  message: string
  createdAt: string
}

export type UserProgramLog = {
  date: string
  logs: Log[]
}
