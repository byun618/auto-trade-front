import styled from '@emotion/styled'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import MyTicker from '../components/Home/MyTicker'
import Page from '../components/public/Page'
import { useMe } from '../contexts/me'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 40px;
`

const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #333333;

  padding: 0 20px;
`

const MyTickerList = styled.div`
  margin-top: 30px;
`

const MyTickerWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fff;
  border-radius: 20px;
  margin: 0 20px;
  margin-bottom: 20px;
  padding: 17px 0;
`

const Home: NextPage = () => {
  const router = useRouter()
  const { myTickers, fetchMyTickers } = useMe()

  useEffect(() => {
    fetchMyTickers()
  }, [])

  return (
    <Page router={router} headerTitle="홈" headerRight="plus" full>
      <Wrapper>
        <Title>내 티커</Title>
        {myTickers && (
          <MyTickerList>
            {myTickers.map((ticker, index) => (
              <MyTickerWrapper key={index}>
                <MyTicker
                  idx={index}
                  name={ticker.name}
                  start={ticker.start}
                  elapse={ticker.elapse}
                  targetPrice={ticker.targetPrice}
                  isHold={ticker.isHold}
                  isSell={ticker.isSell}
                  ror={ticker.ror}
                />
              </MyTickerWrapper>
            ))}
          </MyTickerList>
        )}
      </Wrapper>
    </Page>
  )
}

export default Home
