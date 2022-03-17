import styled from '@emotion/styled'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import MyTicker from '../components/Home/MyTicker'
import MyTickerDetail from '../components/Home/MyTickerDetail'
import Page from '../components/public/Page'
import { useSocket } from '../contexts/socket'

const myTickers = [
  {
    ticker: 'KRW-BTC',
    start: 5,
    elapse: 10,
    isHold: false,
    isSell: false,
  },
  {
    ticker: 'KRW-XRP',
    start: 4,
    elapse: 10,
    targetPrice: 19800,
    isHold: false,
    isSell: false,
  },
  {
    ticker: 'KRW-ETH',
    start: 5,
    elapse: 10,
    targetPrice: 560,
    isHold: true,
    isSell: false,
    ror: 0.9,
  },
  {
    ticker: 'KRW-BTC',
    start: 2,
    elapse: 10,
    targetPrice: 27030,
    isHold: true,
    isSell: false,
    ror: 1.12,
  },
  {
    ticker: 'KRW-XRP',
    start: 11,
    elapse: 10,
    targetPrice: 12333,
    isHold: false,
    isSell: true,
    ror: 0.9,
  },
]

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const MyTickerList = styled.div`
  display: flex;
  overflow: scroll;
  // TODO: 스크롤바 숨기기

  padding: 40px 10px 0 10px;

  & > :not(:first-of-type) {
    margin-left: 10px;
  }
`

const NullWrapper = styled(Wrapper)`
  display: flex;
  border-radius: 20px;
  margin: 30px 20px;
  padding: 15px 12px;
  background: #ffffff;
  justify-content: center;
  align-items: center;
`

const NullText = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-align: center;

  color: #808080;
`

const Home: NextPage = () => {
  const router = useRouter()
  const { connectSocket } = useSocket()
  const [selectTicker, setSelectTicker] = useState(null)

  const onClickTicker = (t: any) => {
    connectSocket(`${t.ticker}-${t.start}-${t.elapse}`)
    setSelectTicker(t)
  }

  return (
    <Page router={router} headerTitle="홈" headerRight="plus" full>
      <Wrapper>
        <MyTickerList>
          {myTickers.map((t, index) => (
            <div key={index}>
              <MyTicker
                ticker={t.ticker}
                start={t.start}
                elapse={t.elapse}
                targetPrice={t.targetPrice}
                isHold={t.isHold}
                isSell={t.isSell}
                ror={t.ror}
                onClick={() => {
                  onClickTicker(t)
                }}
              />
            </div>
          ))}
        </MyTickerList>
        {selectTicker ? (
          <MyTickerDetail ticker={selectTicker} />
        ) : (
          <NullWrapper>
            <NullText>티커를 선택해 주세요.</NullText>
          </NullWrapper>
        )}
      </Wrapper>
    </Page>
  )
}

export default Home
