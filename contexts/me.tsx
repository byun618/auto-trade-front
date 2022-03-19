import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { UserTicker } from '../components/Home/UserTicker'

const defaultValue: {
  myTickers: UserTicker[]
  fetchMyTickers: Function
} = {
  myTickers: [],
  fetchMyTickers: () => {},
}

const MeContext = createContext(defaultValue)

const MeProvider: React.FC = ({ children }) => {
  const [myTickers, setMyTickers] = useState<UserTicker[]>([])

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
