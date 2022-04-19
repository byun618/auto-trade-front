import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { FunctionComponent, useEffect, useMemo, useState } from 'react'
import Page from '../../components/public/Page'
import UserProgram from '../../components/UserProgram'
import ControlButtons from '../../components/UserProgram/ControlButtons'
import ProgramLogs from '../../components/UserProgram/ProgramLogs'
import { useSocket } from '../../hooks/socket'
import { get } from '../../lib/fetcher'
import { set as setCookie } from '../../lib/helper/cookie'
import { UserProgram as UserProgramType } from '../../lib/types'

interface UserProgramDetailPageProps {
  userProgram?: UserProgramType | null
}

export const getServerSideProps: GetServerSideProps<
  UserProgramDetailPageProps
> = async ({ query, req }) => {
  const { _id } = query
  const { token } = req.cookies
  setCookie('token', token)

  const { data: userProgram } = await get<UserProgramType>(
    `${process.env.NEXT_PUBLIC_API_URL}/user-programs/${_id}`,
  )

  return {
    props: { userProgram },
  }
}

const UserProgramDetailPage: FunctionComponent<UserProgramDetailPageProps> = ({
  userProgram,
}) => {
  const router = useRouter()
  const [connected, setConnected] = useState<boolean>(false)
  const { socket, connectSocket } = useSocket()

  const buttons = useMemo(
    () => [
      {
        name: '초기화',
        disabled: true,
        onClick: () => {
          console.log('초기화')
        },
      },
      {
        name: '시작',
        disabled: false,
        onClick: () => {
          console.log('시작')
        },
      },
      {
        name: '정지',
        disabled: true,
        onClick: () => {
          console.log('정지')
        },
      },
      {
        name: '현재가',
        disabled: true,
        onClick: () => {
          console.log('현재가')
        },
      },
    ],
    [],
  )
  const [programLogs, setProgramLogs] = useState<any[]>([
    {
      date: '2021-02-31',
      logs: [
        { time: '12:33', message: '123213' },
        { time: '12:34', message: '12321' },
      ],
    },
    {
      date: '2021-02-31',
      logs: [
        { time: '12:33', message: '123213' },
        { time: '12:34', message: '12321' },
      ],
    },
  ])

  useEffect(() => {
    if (!connected) {
      connectSocket(`${userProgram?.user.name}-${userProgram?.no}`)
      setConnected(true)
    }
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('connect_error', (err) => {
        throw err
      })

      return () => {
        socket.disconnect()
      }
    }
  }, [socket])

  return (
    <Page router={router} headerTitle="내 프로그램" headerLeft="back">
      {userProgram && (
        <>
          <UserProgram userProgram={userProgram} />
          <ControlButtons buttons={buttons} />
          <ProgramLogs programLogs={programLogs} />
        </>
      )}
    </Page>
  )
}

export default UserProgramDetailPage
