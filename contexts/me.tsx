import { createContext, useContext, useEffect, useState } from 'react'
import { UserTicker } from '../components/Home/UserTicker'
import api from '../lib/api'
import { useGlobal } from './global'

const defaultValue: {
  user: any
  userTickers: UserTicker[]
  fetchUserTickers: Function
} = {
  user: null,
  userTickers: [],
  fetchUserTickers: () => {},
}

const MeContext = createContext(defaultValue)

const MeProvider: React.FC = ({ children }) => {
  const { token } = useGlobal()
  const [user, setUser] = useState(null)
  const [userTickers, setUserTickers] = useState<UserTicker[]>([])

  useEffect(() => {
    if (token) {
      fetchUser()
      fetchUserTickers()
    }
  }, [token])

  const fetchUser = async () => {
    const { data } = await api.get('/users')
    setUser(data)
  }

  const fetchUserTickers = async () => {
    const { data } = await api.get('/user-tickers')
    setUserTickers(data)
  }

  return (
    <MeContext.Provider value={{ user, userTickers, fetchUserTickers }}>
      {children}
    </MeContext.Provider>
  )
}

export const useMe = () => useContext(MeContext)

export default MeProvider
