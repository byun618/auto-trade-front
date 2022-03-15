import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Page from '../components/public/Page'
import { useSocket } from '../contexts/socket'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const router = useRouter()
  // const { socket, connectSocket } = useSocket()

  // useEffect(() => {
  //   connectSocket()
  // }, [])

  // useEffect(() => {
  //   if (!socket) return

  //   return () => {
  //     socket.disconnect()
  //   }
  // }, [socket])

  return (
    <Page router={router} headerLeft="back" headerTitle="홈" headerRight="plus">
      <h1>Home</h1>
    </Page>
  )
}

export default Home
