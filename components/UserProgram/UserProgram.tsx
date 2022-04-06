import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import Button from '../public/Button'
import TickerIcon from '../public/TickerIcon'

const TICKER_ICON_SIZE = 30

interface UserProgramProps {
  userProgram: any
  disabled?: boolean
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

const Content = styled.div`
  display: flex;
  min-width: 30%;
`

const TitleWrapper = styled(Content)`
  flex-direction: row;

  justify-content: flex-start;
  align-items: center;

  text-align: left;
`

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;

  font-weight: 600;
  font-size: 12px;
  line-height: 14px;

  color: #333333;

  flex-grow: 1;
`

const Name = styled.div``

const Text = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: #808080;
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

function UserProgram({ userProgram, disabled = false }: UserProgramProps) {
  const router = useRouter()

  return (
    <Wrapper
      onClick={() => {
        router.push(`/user-programs/${userProgram._id}`)
      }}
      disabled={disabled}
    >
      <TitleWrapper>
        <TickerIcon name={userProgram.ticker.market} size={TICKER_ICON_SIZE} />
        <NameWrapper>
          <Name>{userProgram.ticker.korean_name}</Name>
          <Name>{userProgram.ticker.market}</Name>
        </NameWrapper>
      </TitleWrapper>
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
