import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Page from '../components/public/Page'

const Home: NextPage = () => {
  const router = useRouter()

  return (
    <Page
      header={{
        router,
        title: '홈',
        right: 'my-page',
      }}
    >
      asd
    </Page>
  )
}

export default Home
