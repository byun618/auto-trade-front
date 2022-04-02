import { createContext, useContext, useEffect, useState } from 'react'
import api from '../lib/api'
import { useGlobal } from './global'

const defaultValue: {
  user: any
} = {
  user: null,
}

const MeContext = createContext(defaultValue)

const MeProvider: React.FC = ({ children }) => {
  const { token } = useGlobal()
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (token) {
      fetchUser()
    }
  }, [token])

  const fetchUser = async () => {
    const { data } = await api.get('/users')
    setUser(data)
  }

  return <MeContext.Provider value={{ user }}>{children}</MeContext.Provider>
}

export const useMe = () => useContext(MeContext)

export default MeProvider
