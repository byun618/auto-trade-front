import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import SocketProvider from '../contexts/socket'
import GlobalProvider from '../contexts/global'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalProvider>
        <SocketProvider>
          <Head>
            <title>🤖희잉🤖</title>
          </Head>
          <Component {...pageProps} />
        </SocketProvider>
      </GlobalProvider>
    </>
  )
}

export default MyApp
