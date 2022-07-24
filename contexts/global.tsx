import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

type Token = string | undefined

interface Position {
  entryPrice: number
  size: number
  liqPrice: number
  margin: number
  markPrice: number
  pnl: number
  roe: number
}

interface GlobalContextProps {
  token: Token
  setToken: (token: Token) => void
  userSymbol: any
  setUserSymbol: (userSymbol: any) => void
  userSymbolPosition: Position
  setUserSymbolPosition: (userSymbolPosition: any) => void
}

const defaultValues: GlobalContextProps = {
  token: undefined,
  setToken: (token: Token) => {},
  userSymbol: null,
  setUserSymbol: (userSymbol: any) => {},
  userSymbolPosition: {
    entryPrice: 0,
    size: 0,
    liqPrice: 0,
    margin: 0,
    markPrice: 0,
    pnl: 0,
    roe: 0,
  },
  setUserSymbolPosition: (userSymbolPosition: Position) => {},
}

const GlobalContext = createContext<GlobalContextProps>(defaultValues)

export default function GlobalProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<Token>(defaultValues.token)
  const [userSymbol, setUserSymbol] = useState<any>(defaultValues.userSymbol)
  const [userSymbolPosition, setUserSymbolPosition] = useState<Position>(
    defaultValues.userSymbolPosition,
  )

  return (
    <GlobalContext.Provider
      value={{
        token,
        setToken,
        userSymbol,
        setUserSymbol,
        userSymbolPosition,
        setUserSymbolPosition,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobal = () => useContext(GlobalContext)
