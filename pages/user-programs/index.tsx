import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Page from '../../components/public/Page'

const UserProgramPage: NextPage = () => {
  const router = useRouter()
  return (
    <Page router={router} headerTitle="내 프로그램">
      내 프로그램
    </Page>
  )
}

export default UserProgramPage
