import { createContext, ReactNode, useContext, useState } from 'react'

type Token = string | undefined

interface GlobalContextProps {
  token: Token
  setToken: (token: Token) => void
}

const defaultValues: GlobalContextProps = {
  token: undefined,
  setToken: (token: Token) => {},
}

const GlobalContext = createContext<GlobalContextProps>(defaultValues)

export default function GlobalProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<Token>(defaultValues.token)

  return (
    <GlobalContext.Provider value={{ token, setToken }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobal = () => useContext(GlobalContext)
