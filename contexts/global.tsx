import { createContext, useContext, useEffect, useState } from 'react'
import api from '../lib/api'

const defaultValue: {
  token: string | null
  fetchToken: Function
  updateToken: Function
  removeToken: Function
  tickers: string[] | null
} = {
  token: null,
  fetchToken: () => {},
  updateToken: () => {},
  removeToken: () => {},
  tickers: null,
}

const GlobalContext = createContext(defaultValue)

const GlobalProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  const [tickers, setTickers] = useState<string[] | null>(null)

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
    const { data } = await api.get('/tickers')
    setTickers(data)
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
