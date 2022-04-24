import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { UserProgram as UserProgramType } from '../../lib/types'
import Button from '../public/Button'
import TickerIcon from '../Ticker/TickerIcon'
import moment from 'moment-timezone'
import { useMemo } from 'react'

interface UserProgramProps {
  userProgram: UserProgramType
}

const Wrapper = styled(Button)`
  display: flex;
  flex-direction: row;
  padding: 20px 15px;

  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  justify-content: space-between;
  align-items: center;
`

const Text = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;

  color: #808080;
`

const LabelWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  margin-left: 10px;
`

const Name = styled(Text)`
  color: #333333;
`

const Content = styled.div`
  display: flex;
  min-width: 20%;
`

const TimeWrapper = styled(Content)`
  flex-direction: column;

  flex-grow: 1;
  justify-content: center;
  align-items: center;

  & > :not(:first-of-type) {
    margin-top: 2px;
  }
`

const Time = styled(Text)<{ buyTime?: boolean; sellTime?: boolean }>`
  color: ${({ buyTime, sellTime }) =>
    buyTime ? '#b61931' : sellTime ? '#2c54c1' : '#808080'};
`

const StatusWrapper = styled(Content)`
  flex-direction: column;
  justify-content: flex-end;

  text-align: right;
`

const Status = styled(Text)<{ color: string }>`
  color: ${({ color }) => color};
`

const TargetPrice = styled(Text)<{ targetPrice?: boolean }>`
  color: ${({ targetPrice }) => (targetPrice ? '#333333' : '#808080')};
`

function UserProgram({ userProgram }: UserProgramProps) {
  const router = useRouter()
  const { ticker } = userProgram

  const status = useMemo(() => {
    if (userProgram.targetPrice && !userProgram.isHold && !userProgram.isSell) {
      return { text: '매수 대기중', color: '#b61931' }
    } else if (
      userProgram.started &&
      userProgram.isHold &&
      !userProgram.isSell
    ) {
      return { text: '매도 대기중', color: '#2c54c1' }
    } else if (
      userProgram.started &&
      !userProgram.isHold &&
      userProgram.isSell
    ) {
      return { text: '매도 완료', color: '#333333' }
    } else {
      return { text: '대기중', color: '#808080' }
    }
  }, [
    userProgram.targetPrice,
    userProgram.started,
    userProgram.isHold,
    userProgram.isSell,
  ])

  return (
    <Wrapper
      onClick={() => {
        router.push(`/user-programs/${userProgram._id}`)
      }}
    >
      <LabelWrapper>
        <TickerIcon name={ticker.market} size={30} />
        <NameWrapper>
          <Name>{ticker.korean_name}</Name>
          <Name>{ticker.market}</Name>
        </NameWrapper>
      </LabelWrapper>
      <TimeWrapper>
        <Text>
          {userProgram.startTime}시부터 {userProgram.timeInterval}시간
        </Text>
        <Time buyTime={Boolean(userProgram.buyTime)}>
          {userProgram.buyTime
            ? moment(userProgram.buyTime).format('YYYY-MM-DD HH시 mm분')
            : '목표 매수 시간 미정'}
        </Time>
        <Time sellTime={Boolean(userProgram.sellTime)}>
          {userProgram.sellTime
            ? moment(userProgram.sellTime).format('YYYY-MM-DD HH시 mm분')
            : '목표 매도 시간 미정'}
        </Time>
      </TimeWrapper>
      <StatusWrapper>
        <TargetPrice targetPrice={Boolean(userProgram.targetPrice)}>
          {userProgram.targetPrice
            ? `${userProgram.targetPrice.toLocaleString()}원`
            : '목표 금액 미정'}
        </TargetPrice>
        <Status color={status.color}>{status.text}</Status>
      </StatusWrapper>
    </Wrapper>
  )
}

export default UserProgram
