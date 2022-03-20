import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useMe } from '../../contexts/me'
import { useSocket } from '../../contexts/socket'
import UserTicker, { UserTicker as IUserTicker } from '../Home/UserTicker'
import GeneralButton from '../public/GeneralButton'

interface UserTickerDetailProps {
  userTicker: IUserTicker
}

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;

  & > :not(:last-child) {
    margin-right: 3px;
  }
`

const LogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(54, 110, 136, 0.3);
  border-radius: 20px;
  margin: 0 20px;
  margin-bottom: 20px;
  padding: 10px;
`

export default function UserTickerDetail({
  userTicker,
}: UserTickerDetailProps) {
  const { socket, connectSocket } = useSocket()
  const { updateUserTickers } = useMe()
  const [logs, setLogs] = useState<string[]>([])
  const [initDisabled, setInitDisabled] = useState<boolean>(false)
  const [startDisabled, setStartDisabled] = useState<boolean>(false)
  const [stopDisabled, setStopDisabled] = useState<boolean>(false)

  const enableInit = () => {
    setInitDisabled(false)
    setStartDisabled(true)
    setStopDisabled(true)
  }

  const enableStart = () => {
    setInitDisabled(true)
    setStartDisabled(false)
    setStopDisabled(true)
  }

  const enableStop = () => {
    setInitDisabled(true)
    setStartDisabled(true)
    setStopDisabled(false)
  }

  const onClickInit = () => {
    socket?.emit('init', { userTickerId: userTicker._id })
    enableStart()
  }

  const onClickStart = () => {
    socket?.emit('start')
    enableStop()
  }

  const onClickStop = () => {
    socket?.emit('stop')
    enableInit()
  }

  const handleInitRes = async (rsp: any) => {
    const { userTickerId, message, data } = rsp

    setLogs((old) => [...old, message])

    if (message === '이미 프로그램이 동작중입니다.') {
      enableStop()
      return
    }

    if (message === '이미 프로그램이 초기화되었습니다.') {
      enableStart()
      return
    }

    updateUserTickers(userTickerId, data)
  }

  const handleStartRes = async (rsp: any) => {
    const { message } = rsp
    setLogs((old) => [...old, message])
  }

  const handleStoptRes = async (rsp: any) => {
    const { message } = rsp
    setLogs((old) => [...old, message])
  }

  const handleTest = (test: any) => {
    setLogs((old) => [...old, test])
  }

  useEffect(() => {
    connectSocket(userTicker._id)
  }, [])

  useEffect(() => {
    if (socket) {
      onClickInit()

      socket.on('init-res', handleInitRes)
      socket.on('start-res', handleStartRes)
      socket.on('stop-res', handleStoptRes)
      socket.on('test', handleTest)

      return () => {
        socket.disconnect()
      }
    }
  }, [socket])

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <UserTicker userTicker={userTicker} disabled={true} />

      <ButtonContainer>
        <GeneralButton onClick={onClickInit} disabled={initDisabled}>
          초기화
        </GeneralButton>
        <GeneralButton onClick={onClickStart} disabled={startDisabled}>
          시작
        </GeneralButton>
        <GeneralButton onClick={onClickStop} disabled={stopDisabled}>
          정지
        </GeneralButton>
      </ButtonContainer>
      <LogWrapper>
        {logs.map((log, index) => (
          <>
            <div key={index}>{log}</div>
          </>
        ))}
      </LogWrapper>
    </div>
  )
}
