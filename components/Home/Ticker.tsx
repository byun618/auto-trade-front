import styled from '@emotion/styled'
import { useMemo } from 'react'
import { useSocket } from '../../contexts/socket'
import Button from '../public/Button'
import Image from '../public/Image'

const TICKER_IMAGE_SIZE = 33

interface TickerProps {
  ticker: string
  start: number
  elapse: number
  targetPrice?: number | boolean
  isHold: boolean
  isSell: boolean
  ror?: number
  onClick: Function
}

type TargetPriceProps = Partial<TickerProps> & {
  statusColor?: string
  isPositive?: boolean
}

const Wrapper = styled(Button)`
  display: flex;
  background: #ffffff;
  border-radius: 20px;
  padding: 15px 12px;
  min-width: 200px; // TODO: 폰트 적용하면서 해결 해야함
`

const Content = styled.div`
  display: flex;
  text-align: left;
`

const TickerIcon = styled.div`
  width: ${TICKER_IMAGE_SIZE}px;
  height: ${TICKER_IMAGE_SIZE}px;
`

const Left = styled(Content)`
  flex-direction: column;
  justify-content: center;
  margin-right: 14px;
`

const TickerName = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: #333333;

  padding-top: 9px;
`

const TimeSet = styled.div`
  font-weight: 500;
  font-size: 8px;
  line-height: 10px;
  color: #808080;

  padding-top: 2px;
`

const Right = styled(Content)`
  flex-direction: column;
  justify-content: center;
`

const TargetDate = styled.div`
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  color: #333333;
`

const TargetPrice = styled.div<TargetPriceProps>`
  font-style: normal;
  font-weight: ${({ targetPrice }) => (targetPrice ? '600' : '400')};
  font-size: 10px;
  line-height: 12px;
  color: ${({ targetPrice }) => (targetPrice ? '#333333' : '#808080')};
  margin: 5px 0;
`

const StatusWrapper = styled.div`
  display: flex;
`

const Status = styled.div<TargetPriceProps>`
  font-style: normal;
  font-weight: 400;
  font-weight: ${({ statusColor }) =>
    statusColor === '#333333' ? '600' : '400'};
  font-size: 10px;
  line-height: 12px;
  color: ${({ statusColor }) => statusColor};
`

const Ror = styled.div<TargetPriceProps>`
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  line-height: 12px;
  color: #b61931;
  color: ${({ isPositive }) => (isPositive ? '#b61931' : '#2c54c1')};

  margin-left: 4px;
`

export default function Ticker({
  ticker,
  start,
  elapse,
  targetPrice,
  isHold,
  isSell,
  ror,
  onClick,
}: TickerProps) {
  const { socket, connectSocket } = useSocket()

  const status = useMemo(() => {
    if (!targetPrice) return '대기중'
    else if (!isHold && !isSell) return '매수 대기 중'
    else if (isHold) return '매도 대기 중'
    else if (!isHold && isSell) return '매도 완료'
  }, [targetPrice, isHold, isSell])

  const statusColor = useMemo(() => {
    switch (status) {
      case '대기중':
        return '#808080'
      case '매수 대기 중':
        return '#b61931'
      case '매도 대기 중':
        return '#2c54c1'
      case '매도 완료':
        return '#333333'
    }
  }, [status])

  const rorConvert = useMemo(() => {
    if (ror) {
      return ror * 100 - 100
    }
  }, [ror])

  // const onClick = () => {
  //   if (!socket) return

  //   socket.emit('info', { ticker, start, elapse })
  // }

  return (
    <Wrapper onClick={onClick}>
      <Left>
        <TickerIcon>
          <Image
            src={`https://static.upbit.com/logos/${ticker.split('-')[1]}.png`}
            alt={ticker.split('-')[1]}
            width={TICKER_IMAGE_SIZE}
            height={TICKER_IMAGE_SIZE}
          />
        </TickerIcon>
        <TickerName>{ticker}</TickerName>
        <TimeSet>
          {start}시 {elapse}시간
        </TimeSet>
      </Left>
      <Right>
        <TargetDate>2022-03-13 15시</TargetDate>
        <TargetPrice targetPrice={targetPrice}>
          {targetPrice ? `${targetPrice.toLocaleString()}원` : '목표 금액 미정'}
        </TargetPrice>
        <StatusWrapper>
          <Status statusColor={statusColor}>{status}</Status>
          {rorConvert && (
            <Ror isPositive={rorConvert > 0}>{`${rorConvert.toFixed(2)}%`}</Ror>
          )}
        </StatusWrapper>
      </Right>
    </Wrapper>
  )
}
