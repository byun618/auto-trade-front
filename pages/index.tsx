import styled from '@emotion/styled'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import MyTicker from '../components/Home/MyTicker'
import Page from '../components/public/Page'

const myTickers = [
  {
    name: 'KRW-BTC',
    start: 5,
    elapse: 10,
    isHold: false,
    isSell: false,
  },
  {
    name: 'KRW-XRP',
    start: 4,
    elapse: 10,
    targetPrice: 19800,
    isHold: false,
    isSell: false,
  },
  {
    name: 'KRW-ETH',
    start: 5,
    elapse: 10,
    targetPrice: 560,
    isHold: true,
    isSell: false,
    ror: 0.9,
  },
  {
    name: 'KRW-BTC',
    start: 2,
    elapse: 10,
    targetPrice: 27030,
    isHold: true,
    isSell: false,
    ror: 1.12,
  },
  {
    name: 'KRW-XRP',
    start: 11,
    elapse: 10,
    targetPrice: 12333,
    isHold: false,
    isSell: true,
    ror: 0.9,
  },
]

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

  return (
    <Page router={router} headerTitle="홈" headerRight="plus" full>
      <Wrapper>
        <Title>내 티커</Title>
        <MyTickerList>
          {myTickers.map((ticker, index) => (
            <MyTickerWrapper key={index}>
              <MyTicker
                name={ticker.name}
                start={ticker.start}
                elapse={ticker.elapse}
                targetPrice={ticker.targetPrice}
                isHold={ticker.isHold}
                isSell={ticker.isSell}
                ror={ticker.ror}
                onClick={() => {}}
              />
            </MyTickerWrapper>
          ))}
        </MyTickerList>
      </Wrapper>
    </Page>
  )
}

export default Home
