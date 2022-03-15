import styled from '@emotion/styled'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import MyTicker from '../components/MyTicker'
import Page from '../components/public/Page'
import { useSocket } from '../contexts/socket'
import styles from '../styles/Home.module.css'

const MyTickerList = styled.div`
  display: flex;
  overflow: scroll;
  // TODO: 스크롤바 숨기기

  padding: 40px 10px 0 10px;

  & > :not(:first-child) {
    margin-left: 10px;
  }
`

const Home: NextPage = () => {
  const router = useRouter()

  return (
    <Page
      router={router}
      headerLeft="back"
      headerTitle="홈"
      headerRight="plus"
      full
    >
      <MyTickerList>
        <MyTicker
          ticker="KRW-BTC"
          start={5}
          elapse={10}
          isHold={false}
          isSell={false}
          ror={0.9}
        />
        <MyTicker
          ticker="KRW-XRP"
          start={4}
          elapse={10}
          targetPrice={19800}
          isHold={false}
          isSell={false}
        />
        <MyTicker
          ticker="KRW-ETH"
          start={2}
          elapse={10}
          targetPrice={560}
          isHold={true}
          isSell={false}
          ror={0.9}
        />
        <MyTicker
          ticker="KRW-BTC"
          start={3}
          elapse={10}
          targetPrice={27030}
          isHold={false}
          isSell={true}
          ror={1.12}
        />
        <MyTicker
          ticker="KRW-XRP"
          start={11}
          elapse={10}
          targetPrice={12333}
          isHold={false}
          isSell={true}
          ror={0.9}
        />
      </MyTickerList>
    </Page>
  )
}

export default Home
