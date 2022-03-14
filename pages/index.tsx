import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import Page from '../components/public/Page'
import { useSocket } from '../contexts/socket'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
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
    <Page headerTitle="홈">
      <h1>Home</h1>
    </Page>
  )
}

export default Home
