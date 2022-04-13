import 'bootstrap/dist/css/bootstrap.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import GlobalProvider from '../contexts/global'
import SocketProvider from '../contexts/socket'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <SocketProvider>
        <Head>
          <title>🤖Auto Trade🤖</title>
        </Head>
        <Component {...pageProps} />
      </SocketProvider>
    </GlobalProvider>
  )
}

export default MyApp
