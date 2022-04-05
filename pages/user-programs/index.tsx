import styled from '@emotion/styled'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Page from '../../components/public/Page'
import UserProgram from '../../components/UserProgram/UserProgram'
import api from '../../lib/api'

const UserProgramList = styled.div`
  display: flex;
  flex-direction: column;

  & > :not(:first-of-type) {
    margin-top: 15px;
  }
`

const UserProgramPage: NextPage = () => {
  const router = useRouter()
  const [userPrograms, setUserPrograms] = useState<any[]>([])

  useEffect(() => {
    fetchUserPrograms()
  }, [])

  const fetchUserPrograms = async () => {
    const { data } = await api.get('/user-programs')
    setUserPrograms(data)
  }

  return (
    <Page router={router} headerTitle="내 프로그램">
      <UserProgramList>
        {userPrograms.map((userProgram: any, index) => (
          <UserProgram key={index} userProgram={userProgram} />
        ))}
      </UserProgramList>
    </Page>
  )
}

export default UserProgramPage
