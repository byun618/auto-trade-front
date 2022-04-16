import styled from '@emotion/styled'
import { UserProgram as UserProgramType } from '../../lib/types'
import Button from '../public/Button'
import TickerIcon from '../Ticker/TickerIcon'

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

  color: #333333;
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

const Name = styled(Text)``

const Content = styled.div`
  display: flex;
  min-width: 30%;
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

const StatusWrapper = styled(Content)`
  flex-direction: column;
  justify-content: flex-end;

  text-align: right;
`

function UserProgram({ userProgram }: UserProgramProps) {
  const { ticker } = userProgram

  return (
    <Wrapper
      onClick={() => {
        console.log(1)
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
        <Text>목표 매수 시간 미정</Text>
        <Text>목표 매도 시간 미정</Text>
      </TimeWrapper>
      <StatusWrapper>
        <Text>목표 금액 미정</Text>
        <Text>대기중</Text>
      </StatusWrapper>
    </Wrapper>
  )
}

export default UserProgram
