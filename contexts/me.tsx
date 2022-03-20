import axios from 'axios'
import { createContext, useContext, useState } from 'react'
import { UserTicker } from '../components/Home/UserTicker'

const defaultValue: {
  userTickers: UserTicker[]
  fetchUserTickers: Function
  updateUserTickers: Function
} = {
  userTickers: [],
  fetchUserTickers: () => {},
  updateUserTickers: () => {},
}

const MeContext = createContext(defaultValue)

const MeProvider: React.FC = ({ children }) => {
  const [userTickers, setUserTickers] = useState<UserTicker[]>([])

  const fetchUserTickers = async () => {
    const { data } = await axios.get('http://localhost:3001/user-tickers')

    setUserTickers(data)
  }

  const updateUserTickers = async (id: string, updateObj: any) => {
    const idx = userTickers.findIndex((userTicker) => userTicker._id === id)
    const userTicker = userTickers[idx]
    Object.assign(userTicker, updateObj)

    setUserTickers([
      ...userTickers.slice(0, idx),
      userTicker,
      ...userTickers.slice(idx + 1),
    ])

    await axios.post(`http://localhost:3001/user-tickers/${id}`, updateObj)
  }

  return (
    <MeContext.Provider
      value={{ userTickers, fetchUserTickers, updateUserTickers }}
    >
      {children}
    </MeContext.Provider>
  )
}

export const useMe = () => useContext(MeContext)

export default MeProvider
