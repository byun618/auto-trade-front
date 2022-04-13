import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Page from '../../components/public/Page'
import GeneralButton from '../../components/public/GeneralButton'
import { useGlobal } from '../../contexts/global'

const MyPage: NextPage = () => {
  const router = useRouter()
  const { logOut } = useGlobal()

  const onClickLogout = () => {
    logOut()
    router.push('/')
  }

  return (
    <Page router={router} headerTitle="마이페이지" headerLeft="back" noNavbar>
      <GeneralButton onClick={onClickLogout}>로그아웃</GeneralButton>
    </Page>
  )
}

export default MyPage
