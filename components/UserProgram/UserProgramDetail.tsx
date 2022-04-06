import styled from '@emotion/styled'
import { useEffect } from 'react'
import GeneralButton from '../public/GeneralButton'
import UserProgram from './UserProgram'

interface UserProgramProps {
  userProgram: any
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const ButtonWrappers = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 15px;

  & > :not(:first-of-type) {
    margin-left: 10px;
  }
`

const Button = styled(GeneralButton)`
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;

  padding: 7px 15px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const LogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 15px;

  background: rgba(54, 110, 136, 0.3);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`

function UserProgramDetail({ userProgram }: UserProgramProps) {
  return (
    <Wrapper>
      <UserProgram userProgram={userProgram} disabled />
      <ButtonWrappers>
        <Button onClick={() => {}} disabled>
          초기화
        </Button>
        <Button onClick={() => {}}>시작</Button>
        <Button onClick={() => {}} disabled>
          정지
        </Button>
        <Button onClick={() => {}} disabled>
          현재가
        </Button>
      </ButtonWrappers>
      <LogWrapper>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
        <div>asdas</div>
      </LogWrapper>
    </Wrapper>
  )
}

export default UserProgramDetail
