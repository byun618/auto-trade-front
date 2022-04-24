import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { FunctionComponent, useEffect, useState } from 'react'
import Page from '../../components/public/Page'
import UserProgram from '../../components/UserProgram'
import withToken, { WithTokenProps } from '../../hoc/withToken'
import { get } from '../../lib/fetcher'
import { UserProgram as UserProgramType } from '../../lib/types'

const UserProgramList = styled.div`
  display: flex;
  flex-direction: column;

  & > :not(:first-of-type) {
    margin-top: 15px;
  }
`

const UserProgramsPage: FunctionComponent<WithTokenProps> = ({
  status,
  loaded,
}) => {
  const router = useRouter()
  const [userPrograms, setUserPrograms] = useState<UserProgramType[]>([])

  useEffect(() => {
    if (loaded) {
      if (status === 'NOT USER') {
        alert('로그인이 필요합니다.')
        router.replace('/login')
        return
      } else {
        fetchUserPrograms()
      }
    }
  }, [status, loaded])

  const fetchUserPrograms = async () => {
    const { data: userPrograms } = await get<UserProgramType[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/user-programs`,
    )

    setUserPrograms(userPrograms)
  }

  return (
    <Page router={router} headerTitle="내 프로그램">
      {loaded ? (
        <UserProgramList>
          {userPrograms.map((userProgram, index) => (
            <UserProgram key={index} userProgram={userProgram} />
          ))}
        </UserProgramList>
      ) : (
        <>로딩중</>
      )}
    </Page>
  )
}

export default withToken(UserProgramsPage)
