import { NextPage } from 'next'
import { useEffect } from 'react'
import Page from '../components/public/Page'
import { useSocket } from '../contexts/socket'

const Program: NextPage = () => {
  const { socket, connectSocket } = useSocket()

  useEffect(() => {
    connectSocket()
  }, [])

  useEffect(() => {
    if (!socket) return

    return () => {
      socket.disconnect()
    }
  }, [socket])

  return (
    <Page>
      <h1>Program</h1>
    </Page>
  )
}

export default Program
