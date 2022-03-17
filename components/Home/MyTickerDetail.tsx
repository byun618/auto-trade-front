import styled from '@emotion/styled'
import { useEffect } from 'react'
import { useSocket } from '../../contexts/socket'
import Image from '../public/Image'

const TICKER_IMAGE_SIZE = 50

interface MyTicker {
  ticker: string
  start: number
  elapse: number
  targetPrice: number
  isHold: boolean
  isSell: boolean
  ror: number
}

interface MyTickerDetailProps {
  ticker: MyTicker | null
}

const Wrapper = styled.div`
  display: flex;
  border-radius: 20px;
  margin: 30px 20px;
  padding: 15px 12px;
  background: #ffffff;
  //   height: 117vw;
`

const NullWrapper = styled(Wrapper)`
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

const Header = styled.div`
  display: flex;
  align-items: center;
`

const TickerName = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  margin: 0 7px;

  color: #333333;
`

const TimeSet = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;

  color: #808080;
`

export default function MyTickerDetail({ ticker }: MyTickerDetailProps) {
  const { socket } = useSocket()

  useEffect(() => {
    if (!socket) return

    return () => {
      socket.disconnect()
    }
  }, [socket])

  return (
    ticker && (
      <Wrapper>
        <Header>
          <Image
            src={`https://static.upbit.com/logos/${
              ticker.ticker.split('-')[1]
            }.png`}
            alt={ticker.ticker.split('-')[1]}
            width={TICKER_IMAGE_SIZE}
            height={TICKER_IMAGE_SIZE}
          />
          <TickerName>{ticker.ticker}</TickerName>
          <TimeSet>
            {ticker.start}시 {ticker.elapse}시간
          </TimeSet>
        </Header>
      </Wrapper>
    )
  )
}
