import styled from '@emotion/styled'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import MyTickerList from '../components/Home/MyTickerList'
import Page from '../components/public/Page'
import { useMe } from '../contexts/me'

const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #333333;

  padding: 40px 20px 30px 20px;
`

const Home: NextPage = () => {
  const router = useRouter()
  const { myTickers, fetchMyTickers } = useMe()

  useEffect(() => {
    fetchMyTickers()
  }, [])

  return (
    <Page router={router} headerTitle="홈" headerRight="plus" full>
      <Title>내 티커</Title>
      <MyTickerList />
    </Page>
  )
}

export default Home
