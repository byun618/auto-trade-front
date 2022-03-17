import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import SocketProvider from '../contexts/socket'
import GlobalProvider from '../contexts/global'
import MeProvider from '../contexts/me'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalProvider>
        <MeProvider>
          <SocketProvider>
            <Head>
              <title>🤖희잉🤖</title>
            </Head>
            <Component {...pageProps} />
          </SocketProvider>
        </MeProvider>
      </GlobalProvider>
    </>
  )
}

export default MyApp
