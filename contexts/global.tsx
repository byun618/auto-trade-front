import { createContext, useContext, useEffect, useState } from 'react'
import api from '../lib/api'

const defaultValue: {
  token: string | null
  fetchToken: Function
  updateToken: Function
  removeToken: Function
} = {
  token: null,
  fetchToken: () => {},
  updateToken: () => {},
  removeToken: () => {},
}

const GlobalContext = createContext(defaultValue)

const GlobalProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)

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

  return (
    <GlobalContext.Provider
      value={{ token, fetchToken, updateToken, removeToken }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobal = () => useContext(GlobalContext)

export default GlobalProvider
