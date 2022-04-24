import { ComponentType, FC, useEffect, useState } from 'react'
import useToken from '../hooks/token'

export interface WithTokenProps {
  status: string
  loaded: boolean
}

export default function withToken<P extends object>(
  Component: ComponentType<P & WithTokenProps>,
): FC<P & WithTokenProps> {
  return function useTokenComponent(props: P) {
    const [token] = useToken()
    const [status, setStatus] = useState<string>('NOT USER')
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
      if (token) {
        setStatus('USER')
      }

      setLoaded(true)
    }, [])

    return <Component status={status} loaded={loaded} {...props} />
  }
}
