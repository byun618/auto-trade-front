import styled from '@emotion/styled'
import { NextPage } from 'next'
import React, { useEffect } from 'react'
import Setting from '../components/Program/Setting'
import Page from '../components/public/Page'
import { useSocket } from '../contexts/socket'

const Wrapper = styled.div``

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
      <Wrapper>
        <h1>Program</h1>
        <Setting />
      </Wrapper>
    </Page>
  )
}

export default Program
