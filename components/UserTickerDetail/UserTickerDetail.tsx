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

  & > :first-child {
    margin-right: 9px;
  }
`

export default function UserTickerDetail({ id }: UserTickerDetailProps) {
  const { socket, connectSocket } = useSocket()
  const [userTicker, setUserTicker] = useState<IUserTicker | null>(null)

  useEffect(() => {
    connectSocket(id)
  }, [])

  useEffect(() => {
    fetchUserTicker()
  }, [])

  useEffect(() => {
    if (socket) {
      socket.emit('init', { userTickerId: id })

      socket.on('init-res', async () => {
        await fetchUserTicker()
      })

      return () => {
        socket.disconnect()
      }
    }
  }, [socket])

  const fetchUserTicker = async () => {
    const { data } = await axios.get(`http://localhost:3001/user-tickers/${id}`)

    setUserTicker(data)
  }

  return (
    userTicker && (
      <>
        <UserTicker userTicker={userTicker} disabled={true} />
        <ButtonContainer>
          <GeneralButton onClick={() => {}}>시작</GeneralButton>
        </ButtonContainer>
      </>
    )
  )
}
