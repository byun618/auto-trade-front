import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>🤖희잉🤖</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
