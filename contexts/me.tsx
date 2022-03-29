import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { UserTicker } from '../components/Home/UserTicker'
import api from '../lib/api'
import { useGlobal } from './global'

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
  const { token } = useGlobal()
  const [userTickers, setUserTickers] = useState<UserTicker[]>([])

  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        await api.get('/users')
      }

      fetchUser()
    }
  }, [token])

  const fetchUserTickers = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user-tickers`,
    )

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

    await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/user-tickers/${id}`,
      updateObj,
    )
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
