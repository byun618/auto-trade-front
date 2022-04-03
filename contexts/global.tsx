import { createContext, useContext, useEffect, useState } from 'react'
import { Ticker } from '../components/Ticker/Ticker'
import api from '../lib/api'

const defaultValue: {
  token: string | null
  fetchToken: Function
  updateToken: Function
  removeToken: Function
  tickers: Ticker[]
} = {
  token: null,
  fetchToken: () => {},
  updateToken: () => {},
  removeToken: () => {},
  tickers: [],
}

const GlobalContext = createContext(defaultValue)

const GlobalProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  const [tickers, setTickers] = useState<Ticker[]>([])

  useEffect(() => {
    fetchTickers()
  }, [])

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

  const fetchTickers = async () => {
    const { data: tickers } = await api.get('/tickers/verbose')
    setTickers(tickers)
  }

  return (
    <GlobalContext.Provider
      value={{ token, fetchToken, updateToken, removeToken, tickers }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobal = () => useContext(GlobalContext)

export default GlobalProvider
