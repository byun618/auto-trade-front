import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import Page from '../components/public/Page'
import withToken, { WithTokenProps } from '../hoc/withToken'

const Home: FunctionComponent<WithTokenProps> = ({ status, loaded }) => {
  const router = useRouter()
  return (
    <Page router={router} headerTitle="test">
      {loaded && <div>{status}</div>}
    </Page>
  )
}

export default withToken(Home)
