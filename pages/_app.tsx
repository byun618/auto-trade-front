import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import SocketProvider from '../contexts/socket'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SocketProvider>
        <Head>
          <title>🤖희잉🤖</title>
        </Head>
        <Component {...pageProps} />
      </SocketProvider>
    </>
  )
}

export default MyApp
