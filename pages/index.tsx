import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Home from '../components/home'
import Page from '../components/public/Page'
import { useGlobal } from '../contexts/global'

const HomePage: NextPage = () => {
  const router = useRouter()
  const { token } = useGlobal()

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
