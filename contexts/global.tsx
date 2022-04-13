import { createContext, useContext, useEffect, useState } from 'react'
import { Ticker } from '../components/Ticker/Ticker'
import api from '../lib/api'

const defaultValue: {
  token: string | null
  fetchToken: Function
  updateToken: Function
  user: any
  fetchUser: Function
  logOut: Function
  tickers: Ticker[]
  fetchTickers: Function
} = {
  token: null,
  fetchToken: () => {},
  updateToken: () => {},
  user: null,
  fetchUser: () => {},
  logOut: () => {},
  tickers: [],
  fetchTickers: () => {},
}

const GlobalContext = createContext(defaultValue)

const GlobalProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  const [tickers, setTickers] = useState<Ticker[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    fetchToken()
    fetchTickers()
  }, [])

  useEffect(() => {
    if (token) {
      console.log(1)
      fetchUser()
    }
  }, [token])

  const fetchToken = () => {
    const token = localStorage.getItem('token')
    // TODO: 유효한 토큰인지 확인 로직

    if (token) {
      setToken(token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
  }

  const updateToken = (token: string) => {
    localStorage.setItem('token', token)
    fetchToken()
  }

  const removeToken = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  const fetchUser = async () => {
    try {
      const { data } = await api.get('/users')

      setUser(data)
    } catch (err) {
      setUser(null)
    }
  }

  const logOut = () => {
    removeToken()
    setUser(null)
  }

  const fetchTickers = async () => {
    const { data: tickers } = await api.get('/tickers/verbose')
    setTickers(tickers)
  }

  return (
    <GlobalContext.Provider
      value={{
        token,
        fetchToken,
        updateToken,
        logOut,
        user,
        fetchUser,
        tickers,
        fetchTickers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobal = () => useContext(GlobalContext)

export default GlobalProvider
