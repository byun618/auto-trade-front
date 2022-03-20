import styled from '@emotion/styled'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Page from '../../components/public/Page'
import UserTickerDetail from '../../components/UserTickerDetail/UserTickerDetail'

const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #333333;

  padding: 40px 20px 30px 20px;
`

const ButtonWrapper = styled.div`
  padding: 0 20px;
  margin-top: 20px;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;

  & > :first-child {
    margin-right: 9px;
  }
`

const MyTickerDetail: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <Page router={router} headerLeft="back" headerTitle="내 티커" full>
      <Title>내 티커</Title>
      <UserTickerDetail id={id} />
    </Page>
  )
}

export default MyTickerDetail
