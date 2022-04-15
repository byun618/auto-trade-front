import { useRouter } from 'next/router'
import { FunctionComponent, useEffect } from 'react'
import Page from '../components/public/Page'
import withToken, { WithTokenProps } from '../hoc/withToken'

const Home: FunctionComponent<WithTokenProps> = ({ status, loaded }) => {
  const router = useRouter()

  useEffect(() => {
    if (loaded && status === 'NOT USER') {
      alert('로그인이 필요합니다.')
      router.replace('/login')
    }
  }, [status, loaded])

  return loaded ? (
    <Page router={router} headerTitle="홈">
      <div>{status}</div>
    </Page>
  ) : (
    <></>
  )
}

export default withToken(Home)
