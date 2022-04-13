import styled from '@emotion/styled'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Page from '../../components/public/Page'
import UserProgram from '../../components/UserProgram/UserProgram'
import { useGlobal } from '../../contexts/global'
import api from '../../lib/api'

const UserProgramList = styled.div`
  display: flex;
  flex-direction: column;

  & > :not(:first-of-type) {
    margin-top: 15px;
  }
`

const UserProgramPage = () => {
  const router = useRouter()
  const { user } = useGlobal()
  const [userPrograms, setUserPrograms] = useState<any[] | null>(null)

  useEffect(() => {
    if (user) {
      fetchUserPrograms()
    }
  }, [user])

  const fetchUserPrograms = async () => {
    const { data } = await api.get('/user-programs')
    setUserPrograms(data)
  }

  // TODO: 깜빡거림 방지
  return (
    <Page router={router} headerTitle="내 프로그램">
      {userPrograms ? (
        <UserProgramList>
          {userPrograms.map((userProgram: any, index) => (
            <UserProgram key={index} userProgram={userProgram} />
          ))}
        </UserProgramList>
      ) : (
        <>로그인이 필요합니다.</>
      )}
    </Page>
  )
}

export default UserProgramPage
