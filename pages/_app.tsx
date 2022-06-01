import type { AppProps } from 'next/app'
import Head from 'next/head'
import AppComponent from '../components/public/AppComponent'
import GlobalProvider from '../contexts/global'
import '../styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>
      <GlobalProvider>
        <AppComponent Component={Component} {...pageProps} />
      </GlobalProvider>
    </>
  )
}

export default App
