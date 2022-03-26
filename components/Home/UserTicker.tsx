import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import Button from '../public/Button'
import TickerIcon from '../public/TickerIcon'

const TICKER_IMAGE_SIZE = 50

export interface UserTicker {
  _id: string
  name: string
  start: number
  elapse: number
  buyTime: string
  sellTime: string
  targetPrice?: number | boolean
  isHold?: boolean
  isSell?: boolean
  ror?: number
}

interface UserTickerProps {
  userTicker: UserTicker
  disabled?: boolean
}

type StyleProps = Partial<UserTicker> & {
  statusColor?: string
  isPositive?: boolean
}

const ButtonWrapper = styled(Button)`
  display: flex;
  background-color: #ffffff;
  border-radius: 20px;
`

const Wrapper = styled.div`
  display: flex;
  padding: 12px 30px;
  width: 100%;
`

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  flex-grow: 1;
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
  justify-content: center;
  text-align: right;

  & > :not(:last-child) {
    margin-bottom: 1px;
  }
`

const TargetDate = styled.div<StyleProps>`
  font-weight: 600;
  font-weight: ${({ buyTime, sellTime }) =>
    buyTime && sellTime ? '600' : '400'};
  font-size: 15px;
  line-height: 18px;
  color: #333333;
  color: ${({ buyTime, sellTime }) =>
    buyTime && sellTime ? '#333333' : '#808080'};
`

const BuyTime = styled(TargetDate)`
  color: ${({ buyTime, sellTime }) =>
    buyTime && sellTime ? '#b61931' : '#808080'};
`

const SellTime = styled(TargetDate)`
  color: ${({ buyTime, sellTime }) =>
    buyTime && sellTime ? '#2c54c1' : '#808080'};
`

const TargetPrice = styled.div<StyleProps>`
  font-weight: ${({ targetPrice }) => (targetPrice ? '600' : '400')};
  font-size: 15px;
  line-height: 18px;
  color: ${({ targetPrice }) => (targetPrice ? '#333333' : '#808080')};
`

const CurrentStatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
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

export default function UserTicker({
  userTicker,
  disabled = false,
}: UserTickerProps) {
  const router = useRouter()
  const {
    _id,
    name,
    start,
    elapse,
    buyTime,
    sellTime,
    targetPrice,
    isHold,
    isSell,
    ror,
  } = userTicker

  const status = useMemo(() => {
    if (targetPrice && !isHold && !isSell) return '매수 대기 중'
    else if (isHold) return '매도 대기 중'
    else if (!isHold && isSell) return '매도 완료'
    else return '대기중'
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

  return (
    <ButtonWrapper
      onClick={() => {
        router.push(`/user-ticker/${_id}`)
      }}
      disabled={disabled}
    >
      <Wrapper>
        <InfoWrapper>
          <TickerIcon name={name} size={TICKER_IMAGE_SIZE} />
          <Name>{name}</Name>
          <TimeSet>
            {start}시 {elapse}시간
          </TimeSet>
        </InfoWrapper>
        <StatusWrapper>
          <BuyTime buyTime={buyTime} sellTime={sellTime}>
            {buyTime ?? '목표 매수 일시 미정'}
          </BuyTime>
          <SellTime sellTime={sellTime} buyTime={buyTime}>
            {sellTime ?? '목표 매도 일시 미정'}
          </SellTime>
          <TargetPrice targetPrice={targetPrice}>
            {targetPrice
              ? `${targetPrice.toLocaleString()}원`
              : '목표 금액 미정'}
          </TargetPrice>
          <CurrentStatusWrapper>
            <CurrentStatus statusColor={statusColor}>{status}</CurrentStatus>
            {rorConvert && (
              <Ror isPositive={rorConvert > 0}>{`${rorConvert.toFixed(
                2,
              )}%`}</Ror>
            )}
          </CurrentStatusWrapper>
        </StatusWrapper>
      </Wrapper>
    </ButtonWrapper>
  )
}
