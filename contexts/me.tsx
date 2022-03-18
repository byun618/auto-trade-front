import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { MyTicker } from '../components/Home/MyTicker'

const defaultValue: {
  myTickers: MyTicker[]
  fetchMyTickers: Function
} = {
  myTickers: [],
  fetchMyTickers: () => {},
}

const MeContext = createContext(defaultValue)

const MeProvider: React.FC = ({ children }) => {
  const [myTickers, setMyTickers] = useState<MyTicker[]>([])

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
