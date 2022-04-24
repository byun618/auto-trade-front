import React, { createContext, ReactNode, useContext, useState } from 'react'
import socketIOClient, { Socket } from 'socket.io-client'
import { get } from '../lib/helper/cookie'

const defaultValue: {
  socket: Socket | null
  connectSocket: (appPath: string) => void
} = {
  socket: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  connectSocket: () => {},
}

const SocketContext = createContext(defaultValue)

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  const connectSocket = (appPath: string) => {
    const tempSocket = socketIOClient(
      `${String(process.env.NEXT_PUBLIC_PROGRAM_URL)}`,
      {
        path: `/${appPath}`,
        auth: {
          token: get('token'),
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
