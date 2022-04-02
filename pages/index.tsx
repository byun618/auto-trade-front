import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import Coin from '../components/Coin/Coin'
import Login from '../components/Login/Login'
import Page from '../components/public/Page'
import { useGlobal } from '../contexts/global'

const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #333333;

  padding: 40px 20px 30px 20px;
`

const Home = () => {
  const router = useRouter()
  const [loaded, setLoaded] = useState<boolean>(false)
  const { token, fetchToken } = useGlobal()

  useEffect(() => {
    fetchToken()
    setLoaded(true)
  }, [])

  const pageProps = useMemo(() => {
    return token
      ? {
          headerTitle: '코인',
          headerRight: ['user'],
        }
      : { headerTitle: '로그인', headerRight: [], noNavbar: true }
  }, [token])

  return (
    loaded && (
      <Page router={router} {...pageProps}>
        {token ? <Coin /> : <Login />}
      </Page>
    )
  )
}

export default Home
