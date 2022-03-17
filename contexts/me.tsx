import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'

interface MyTicker {
  name: string
  start: number
  elapse: number
  targetPrice?: number | boolean
  isHold?: boolean
  isSell?: boolean
  ror?: number
  onClick?: Function
}

const defaultValue: {
  myTickers: MyTicker[] | null
  fetchMyTickers: Function
} = {
  myTickers: null,
  fetchMyTickers: () => {},
}

const MeContext = createContext(defaultValue)

const MeProvider: React.FC = ({ children }) => {
  const [myTickers, setMyTickers] = useState<MyTicker[] | null>(null)

  const fetchMyTickers = async () => {
    const { data } = await axios.get('http://localhost:3001/user-tickers')

    setMyTickers(data)
  }

  return (
    <MeContext.Provider value={{ myTickers, fetchMyTickers }}>
      {children}
    </MeContext.Provider>
  )
}

export const useMe = () => useContext(MeContext)

export default MeProvider
