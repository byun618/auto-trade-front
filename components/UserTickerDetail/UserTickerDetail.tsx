import styled from '@emotion/styled'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSocket } from '../../contexts/socket'
import UserTicker, { UserTicker as IUserTicker } from '../Home/UserTicker'
import GeneralButton from '../public/GeneralButton'

interface UserTickerDetailProps {
  id: string | string[] | undefined
}

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
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

export default function UserTickerDetail({ id }: UserTickerDetailProps) {
  const { socket, connectSocket } = useSocket()
  const [userTicker, setUserTicker] = useState<IUserTicker | null>(null)
  const [logs, setLogs] = useState<string[]>([])

  const onClickStart = () => {
    socket?.emit('start')
  }

  const handleInitRes = async ({ message }: any) => {
    await fetchUserTicker()

    setLogs((old) => [...old, message])
  }

  const handleStartRes = async ({ message }: any) => {
    await fetchUserTicker()
    setLogs((old) => [...old, message])
  }

  useEffect(() => {
    connectSocket(id)
  }, [])

  useEffect(() => {
    fetchUserTicker()
  }, [])

  useEffect(() => {
    if (socket) {
      socket.emit('init', { userTickerId: id })

      socket.on('init-res', handleInitRes)
      socket.on('start-res', handleStartRes)

      return () => {
        socket.disconnect()
      }
    }
  }, [socket])

  const fetchUserTicker = async () => {
    setUserTicker(null)
    const { data } = await axios.get(`http://localhost:3001/user-tickers/${id}`)
    console.log(data.isStart)

    setUserTicker(data)
  }

  return (
    userTicker && (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <UserTicker userTicker={userTicker} disabled={true} />

        <ButtonContainer>
          <GeneralButton onClick={onClickStart} disabled={userTicker.isStart}>
            시작
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
  )
}
