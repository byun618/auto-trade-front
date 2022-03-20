import styled from '@emotion/styled'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Page from '../../components/public/Page'
import UserTickerDetail from '../../components/UserTickerDetail/UserTickerDetail'

const UserTickerDetailWrapper = styled.div`
  margin-top: 40px;
`

const MyTickerDetail: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Page router={router} headerLeft="back" headerTitle="내 티커" full>
      <UserTickerDetailWrapper>
        <UserTickerDetail id={id} />
      </UserTickerDetailWrapper>
    </Page>
  )
}

export default MyTickerDetail
