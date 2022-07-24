import { useEffect, useState } from 'react'
import socketIOClient, { Socket } from 'socket.io-client'
import { useGlobal } from '../contexts/global'
import api from '../lib/api/api'

const useSocket = (userSymbolId: string, token: string) => {
  const { setUserSymbol, setUserSymbolPosition } = useGlobal()

  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    if (socket) {
      socket.on('message', onMessage)

      return () => {
        socket.disconnect()
        setSocket(null)
      }
    }
  }, [socket])

  const onMessage = async ({
    type,
    payload,
  }: {
    type: string
    payload: any
  }) => {
    if (type === 'refresh-user-symbol') {
      const { data } = await api.get(`/user-symbols/${userSymbolId}`)

      setUserSymbol(data)
    } else if (type === 'refresh-user-symbol-position') {
      setUserSymbolPosition(payload)
    }
  }

  const connect = () => {
    const _socket = socketIOClient(`${process.env.NEXT_PUBLIC_PROGRAM_URL}`, {
      path: `/${userSymbolId}`,
      auth: { token },
      transports: ['websocket'],
    })
    setSocket(_socket)
  }

  return { socket, setSocket, connect }
}

export default useSocket
