import { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useSetToken } from '../../hooks/useToken'
import { get } from '../../lib/helper/cookie'

const AppComponent = ({ Component, pageProps }: AppProps) => {
  const setToken = useSetToken()
  const cookie = get('name')

  useEffect(() => {
    if (cookie) {
      setToken(cookie)
    }
  }, [])

  return (
    <>
      <Component {...pageProps} />
    </>
  )
}

export default AppComponent
