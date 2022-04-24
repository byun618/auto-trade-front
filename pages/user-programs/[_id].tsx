import styled from '@emotion/styled'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { FunctionComponent, useEffect, useState } from 'react'
import Page from '../../components/public/Page'
import UserProgram from '../../components/UserProgram'
import ControlButton from '../../components/UserProgram/ControlButton'
import UserProgramLogs from '../../components/UserProgram/UserProgramLogs'
import { useSocket } from '../../hooks/socket'
import { del, get } from '../../lib/fetcher'
import { set as setCookie } from '../../lib/helper/cookie'
import { UserProgram as UserProgramType, UserProgramLog } from '../../lib/types'

interface UserProgramDetailPageProps {
  userProgram: UserProgramType
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

const ControlButtons = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 10px;

  & > :not(:first-of-type) {
    margin-left: 10px;
  }
`

const UserProgramDetailPage: FunctionComponent<UserProgramDetailPageProps> = ({
  userProgram: originalUserProgram,
}) => {
  const router = useRouter()

  const { socket, connectSocket } = useSocket()

  const [userProgram, setUserProgram] =
    useState<UserProgramType>(originalUserProgram)
  const [userProgramLogs, setUserProgramLogs] = useState<any[]>([])

  useEffect(() => {
    connectSocket(`${userProgram?.user.name}-${userProgram?.no}`)
  }, [])

  useEffect(() => {
    if (socket) {
      // TODO: programLogs로 연결
      socket.on('message', async ({ message }) => {
        console.log(message)
        await fetch()
      })

      socket.on('connect_error', (err) => {
        throw err
      })

      socket.on('error', (err) => {
        console.log(err)
      })

      return () => {
        socket.disconnect()
      }
    }
  }, [socket])

  const fetch = async () => {
    const { data } = await get<UserProgramType>(
      `${process.env.NEXT_PUBLIC_API_URL}/user-programs/${userProgram._id}`,
    )
    setUserProgram(data)

    const { data: userProgramLogs } = await get<UserProgramLog[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/user-program-logs/${userProgram._id}`,
    )
    setUserProgramLogs(userProgramLogs)
  }

  const onClickStart = () => {
    socket?.emit('start')
  }

  const onClickStop = () => {
    socket?.emit('stop')
  }

  const onClickCurrentPrice = () => {
    socket?.emit('current-price')
  }

  const onClickDeleteLogs = async () => {
    await del(
      `${process.env.NEXT_PUBLIC_API_URL}/user-program-logs/${userProgram._id}`,
    )
    fetch()
  }

  return (
    <Page router={router} headerTitle="내 프로그램" headerLeft="back">
      {userProgram && (
        <>
          <UserProgram userProgram={userProgram} />
          <ControlButtons>
            <ControlButton
              name="시작"
              disabled={userProgram.started as boolean}
              onClick={onClickStart}
            />
            <ControlButton
              name="정지"
              disabled={!userProgram.started as boolean}
              onClick={onClickStop}
            />
            <ControlButton name="현재가" onClick={onClickCurrentPrice} />
            <ControlButton name="로그 삭제" onClick={onClickDeleteLogs} />
          </ControlButtons>
          <UserProgramLogs userProgramLogs={userProgramLogs} />
        </>
      )}
    </Page>
  )
}

export default UserProgramDetailPage
