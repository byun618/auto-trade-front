import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Page from '../components/public/Page'

const LoginPage: NextPage = () => {
  const router = useRouter()

  return (
    <Page
      header={{
        router,
        left: 'back',
        title: '로그인',
      }}
      full
    >
      dsadasd
    </Page>
  )
}

export default LoginPage
