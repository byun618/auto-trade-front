import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useMe } from '../../contexts/me'
import { useSocket } from '../../contexts/socket'
import UserTicker, { UserTicker as IUserTicker } from '../Home/UserTicker'
import GeneralButton from '../public/GeneralButton'

interface UserTickerDetailProps {
  userTicker: IUserTicker
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;

  & > :not(:last-child) {
    margin-right: 3px;
  }
`

const LogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(54, 110, 136, 0.3);
  border-radius: 20px;
  margin-bottom: 20px;
  padding: 10px;
`

export default function UserTickerDetail({
  userTicker,
}: UserTickerDetailProps) {
  const { socket, connectSocket } = useSocket()
  const { fetchUserTickers } = useMe()
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

  const onClickStop = async () => {
    socket?.emit('stop')
    enableInit()
  }

  const onClickCurrent = () => {
    socket?.emit('current-price')
  }

  const log = (message: string) => {
    setLogs((old) => [...old, message])
  }

  const handleMessage = async (rsp: any) => {
    const { message } = rsp

    if (message === '이미 프로그램이 동작중입니다.') {
      enableStop()
    }

    if (message === '이미 프로그램이 초기화되었습니다.') {
      enableStart()
    }

    if (message === '다음날 시도 해주세요.') {
      enableInit()
    }

    await fetchUserTickers()

    log(message)
  }

  const handleError = async (rsp: any) => {
    const { message } = rsp
    log(message)

    await onClickStop()
  }

  useEffect(() => {
    connectSocket(userTicker._id)
  }, [])

  useEffect(() => {
    if (socket) {
      onClickInit()

      socket.on('message', handleMessage)
      socket.on('error', handleError)

      return () => {
        socket.disconnect()
      }
    }
  }, [socket])

  return (
    <Wrapper>
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
        <GeneralButton onClick={onClickCurrent} disabled={stopDisabled}>
          현재가
        </GeneralButton>
      </ButtonContainer>
      <LogWrapper>
        {logs.map((log, index) => (
          <>
            <div key={index}>{log}</div>
          </>
        ))}
      </LogWrapper>
    </Wrapper>
  )
}
