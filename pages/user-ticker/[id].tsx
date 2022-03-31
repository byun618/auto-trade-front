import styled from '@emotion/styled'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { UserTicker } from '../../components/Home/UserTicker'
import Page from '../../components/public/Page'
import UserTickerDetail from '../../components/UserTickerDetail/UserTickerDetail'
import { useMe } from '../../contexts/me'

const UserTickerDetailWrapper = styled.div`
  margin-top: 30px;
`

const MyTickerDetail: NextPage = () => {
  const router = useRouter()
  const { userTickers } = useMe()
  const [userTicker, setUserTicker] = useState<UserTicker | null | undefined>(
    null,
  )
  const { id } = router.query

  useEffect(() => {
    const userTicker = userTickers.find((userTicker) => userTicker._id === id)
    setUserTicker(userTicker)
  }, [userTickers])

  return (
    <Page router={router} headerLeft="back" headerTitle="내 티커">
      {userTicker && (
        <UserTickerDetailWrapper>
          <UserTickerDetail userTicker={userTicker} />
        </UserTickerDetailWrapper>
      )}
    </Page>
  )
}

export default MyTickerDetail
