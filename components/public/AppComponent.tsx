import styled from '@emotion/styled'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useGlobal } from '../../contexts/global'
import { setHeaderToken } from '../../lib/api/api'
import { get } from '../../lib/helper/cookie'
import Loading from './Loading'

const LOADING_SIZE = 70

const LoadingPage = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 100vh;
  min-width: 100vw;

  justify-content: center;
  align-items: center;
  background-color: #17191c;

  color: #fff;

  & > :first-of-type {
    margin-bottom: 20px;
  }
`

const AppComponent = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const cookie = get('token')
  // const [token, setToken] = useToken()
  const { token, setToken } = useGlobal()
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (cookie) {
      setToken(cookie)
      setHeaderToken(cookie)
    } else {
      router.replace('/my-page')
    }

    setTimeout(() => {
      setLoaded(true)
    }, 300)
  }, [token])

  return loaded ? (
    <>
      <Component {...pageProps} />
    </>
  ) : (
    <LoadingPage>
      <Loading width={LOADING_SIZE} height={LOADING_SIZE} />
      잠시만 기다려주세요.
    </LoadingPage>
  )
}

export default AppComponent
