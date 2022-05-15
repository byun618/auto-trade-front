import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Login from '../components/MyPage/Login'
import Page from '../components/public/Page'

const LoginPage: NextPage = () => {
  const router = useRouter()

  return (
    <Page
      header={{
        router,
        title: '로그인',
        left: 'back',
        right: 'logout',
      }}
      full
    >
      <Login />
    </Page>
  )
}

export default LoginPage
