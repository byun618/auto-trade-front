import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useGlobal } from '../contexts/global'

const Home = () => {
  const router = useRouter()
  const [loaded, setLoaded] = useState<boolean>(false)
  const { token, fetchToken } = useGlobal()

  useEffect(() => {
    // TODO: global에서 진행해야함
    fetchToken()
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) {
      if (token) {
        router.push('/ticker')
      } else {
        router.push('/login')
      }
    }
  }, [loaded, token])

  return <></>
}

export default Home
