import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Login from '../../components/Login/Login'
import Page from '../../components/public/Page'

const LoginPage: NextPage = () => {
  const router = useRouter()

  return (
    <Page router={router} headerTitle="" noHeader full>
      <Login />
    </Page>
  )
}

export default LoginPage
