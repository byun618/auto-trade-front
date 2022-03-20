import axios from 'axios'
import { createContext, useContext, useState } from 'react'
import { UserTicker } from '../components/Home/UserTicker'

const defaultValue: {
  userTickers: UserTicker[]
  fetchUserTickers: Function
} = {
  userTickers: [],
  fetchUserTickers: () => {},
}

const MeContext = createContext(defaultValue)

const MeProvider: React.FC = ({ children }) => {
  const [userTickers, setUserTickers] = useState<UserTicker[]>([])

  const fetchUserTickers = async () => {
    const { data } = await axios.get('http://localhost:3001/user-tickers')

    setUserTickers(data)
  }

  return (
    <MeContext.Provider value={{ userTickers, fetchUserTickers }}>
      {children}
    </MeContext.Provider>
  )
}

export const useMe = () => useContext(MeContext)

export default MeProvider
