import styled from '@emotion/styled'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useSetToken } from '../../hooks/useToken'
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
  const setToken = useSetToken()
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (cookie) {
      setToken(cookie)
    } else {
      router.replace('/my-page')
    }

    setTimeout(() => {
      setLoaded(true)
    }, 300)
  }, [])

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
