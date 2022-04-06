import styled from '@emotion/styled'
import { useEffect } from 'react'
import UserProgram from './UserProgram'

interface UserProgramProps {
  userProgram: any
}

const Wrapper = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  //   flex-grow: 1;
`

const Pannel = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;

  margin-top: 20px;
  border-radius: 20px;
`

function UserProgramDetail({ userProgram }: UserProgramProps) {
  return (
    <Wrapper>
      <UserProgram userProgram={userProgram} disabled />
      <Pannel>asd</Pannel>
    </Wrapper>
  )
}

export default UserProgramDetail
