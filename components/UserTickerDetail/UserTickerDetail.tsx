import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSocket } from '../../contexts/socket'
import UserTicker, { UserTicker as IUserTicker } from '../Home/UserTicker'

interface UserTickerDetailProps {
  id: string | string[] | undefined
}

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
      </>
    )
  )
}
