import { useRouter } from 'next/router'
import LoginContainer from '../components/Login'
import Page from '../components/public/Page'

const LoginPage = () => {
  const router = useRouter()

  return (
    <Page router={router} headerTitle="로그인">
      <LoginContainer />
    </Page>
  )
}

export default LoginPage
