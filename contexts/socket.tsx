import { createContext, useContext, useEffect, useState } from 'react'
import socketIOClient, { Socket } from 'socket.io-client'
import { useMe } from './me'

const defaultValue: {
  socket: Socket | null
  connectSocket: any
} = {
  socket: null,
  connectSocket: () => {},
}

const SocketContext = createContext(defaultValue)

const SocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  const connectSocket = (userTickerId: string) => {
    const tempSocket = socketIOClient(
      `${String(process.env.NEXT_PUBLIC_PROGRAM_URL)}/${userTickerId}`,
      {
        query: {
          userTickerId,
        },
        transports: ['websocket'],
      },
    )

    setSocket(tempSocket)
  }

  return (
    <SocketContext.Provider value={{ socket, connectSocket }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => useContext(SocketContext)

export default SocketProvider
