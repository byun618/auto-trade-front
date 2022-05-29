import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Home from '../components/home'
import Page from '../components/public/Page'
import { useTokenValue } from '../hooks/useToken'

const HomePage: NextPage = () => {
  const router = useRouter()
  const token = useTokenValue()

  return (
    <Page
      header={{
        router,
        title: '홈',
        right: 'my-page',
      }}
      full
    >
      {token && <Home />}
    </Page>
  )
}

export default HomePage
