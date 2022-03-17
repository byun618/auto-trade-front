import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Page from '../components/public/Page'

const AddTicker: NextPage = () => {
  const router = useRouter()
  return (
    <Page router={router} headerLeft="back" headerTitle="티커 추가" full>
      dasdas
    </Page>
  )
}

export default AddTicker
