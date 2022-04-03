import { useRouter } from 'next/router'
import Login from '../../components/Login/Login'
import Page from '../../components/public/Page'

const LoginPage = () => {
  const router = useRouter()

  return (
    <Page router={router} headerTitle="로그인" noNavbar={true}>
      <Login />
    </Page>
  )
}

export default LoginPage
