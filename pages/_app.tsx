import type { AppProps } from 'next/app'
import SocketProvider from '../hooks/socket'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SocketProvider>
      <Component {...pageProps} />
    </SocketProvider>
  )
}

export default MyApp
