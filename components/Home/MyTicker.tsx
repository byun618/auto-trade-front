import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { CSSProperties, useMemo } from 'react'
import { useSocket } from '../../contexts/socket'
import Button from '../public/Button'
import TickerIcon from '../public/TickerIcon'

const TICKER_IMAGE_SIZE = 50

export interface MyTicker {
  _id: string
  name: string
  start: number
  elapse: number
  targetDate?: string
  targetPrice?: number | boolean
  isHold?: boolean
  isSell?: boolean
  ror?: number
}

interface MyTickerProps {
  myTicker: MyTicker
}

type StyleProps = Partial<MyTicker> & {
  statusColor?: string
  isPositive?: boolean
}

const Wrapper = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 17px 15px;
  margin: 0 20px;
  border-radius: 20px;
  text-align: left;
  background-color: #ffffff;
`

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 7px;
  margin-right: 20px;
`

const Name = styled.div`
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #333333;
`

const TimeSet = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #808080;
`

const StatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const TargetDate = styled.div<StyleProps>`
  font-weight: 600;
  font-weight: ${({ targetDate }) => (targetDate ? '600' : '400')};
  font-size: 15px;
  line-height: 18px;
  color: #333333;
  color: ${({ targetDate }) => (targetDate ? '#333333' : '#808080')};
`

const TargetPrice = styled.div<StyleProps>`
  font-weight: ${({ targetPrice }) => (targetPrice ? '600' : '400')};
  font-size: 15px;
  line-height: 18px;
  color: ${({ targetPrice }) => (targetPrice ? '#333333' : '#808080')};
  margin: 5px 0;
`

const CurrentStatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const CurrentStatus = styled.div<StyleProps>`
  font-weight: 400;
  font-weight: ${({ statusColor }) =>
    statusColor === '#333333' ? '600' : '400'};
  font-size: 15px;
  line-height: 18px;
  color: ${({ statusColor }) => statusColor};
`

const Ror = styled.div<StyleProps>`
  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
  color: #b61931;
  color: ${({ isPositive }) => (isPositive ? '#b61931' : '#2c54c1')};

  margin-left: 8px;
`

export default function MyTicker({ myTicker }: MyTickerProps) {
  const {
    _id,
    name,
    start,
    elapse,
    targetDate,
    targetPrice,
    isHold,
    isSell,
    ror,
  } = myTicker
  const router = useRouter()
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
    <Wrapper
      onClick={() => {
        router.push(`/my-ticker-detail/${_id}`)
      }}
    >
      <TickerIcon name={name} size={TICKER_IMAGE_SIZE} />
      <InfoWrapper>
        <Name>{name}</Name>
        <TimeSet>
          {start}시간 {elapse}시간
        </TimeSet>
      </InfoWrapper>
      <StatusWrapper>
        <TargetDate targetDate={targetDate}>
          {targetDate ?? '목표 Date 미정'}
        </TargetDate>
        <TargetPrice targetPrice={targetPrice}>
          {targetPrice ? `${targetPrice.toLocaleString()}원` : '목표 금액 미정'}
        </TargetPrice>
        <CurrentStatusWrapper>
          <CurrentStatus statusColor={statusColor}>{status}</CurrentStatus>
          {rorConvert && (
            <Ror isPositive={rorConvert > 0}>{`${rorConvert.toFixed(2)}%`}</Ror>
          )}
        </CurrentStatusWrapper>
      </StatusWrapper>
    </Wrapper>
  )
}
