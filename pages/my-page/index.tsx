import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Login from '../../components/my-page/Login'
import Page from '../../components/public/Page'
import { useGlobal } from '../../contexts/global'

const LoginPage: NextPage = () => {
  const router = useRouter()
  const { token } = useGlobal()

  return (
    <Page
      header={{
        router,
        title: '마이 페이지',
        left: token ? 'back' : undefined,
        right: token ? 'logout' : undefined,
      }}
      full
    >
      {!token && <Login />}
    </Page>
  )
}

export default LoginPage
