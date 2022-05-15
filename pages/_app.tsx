import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import AppComponent from '../components/public/AppComponent'
import '../styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>
      <AppComponent Component={Component} {...pageProps} />
    </RecoilRoot>
  )
}

export default App
