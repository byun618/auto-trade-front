import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const defaultValue: {
  tickers: string[] | null
} = {
  tickers: null,
}

const GlobalContext = createContext(defaultValue)

const GlobalProvider: React.FC = ({ children }) => {
  const [tickers, setTickers] = useState<string[] | null>(null)

  const fetchTickers = async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/tickers`,
    )

    setTickers(data)
  }

  useEffect(() => {
    fetchTickers()
  }, [])

  return (
    <GlobalContext.Provider value={{ tickers }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobal = () => useContext(GlobalContext)

export default GlobalProvider
