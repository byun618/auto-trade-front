import styled from '@emotion/styled'
import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import MyTicker, { MyTicker as IMyTicker } from '../../components/Home/MyTicker'
import GeneralButton from '../../components/public/GeneralButton'
import Page from '../../components/public/Page'

const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #333333;

  padding: 40px 20px 30px 20px;
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
  const [myTicker, setMyTicker] = useState<IMyTicker | null>(null)

  const fetchMyTicker = async () => {
    const { data } = await axios('http://localhost:3001/user-tickers/' + id)
    setMyTicker(data)
  }

  useEffect(() => {
    fetchMyTicker()
  }, [])

  return (
    <Page router={router} headerLeft="back" headerTitle="내 티커" full>
      <Title>내 티커</Title>
      {myTicker && (
        <>
          <MyTicker myTicker={myTicker} />
          <ButtonContainer>
            <GeneralButton onClick={() => {}}>시간 및 목표 지정</GeneralButton>
            <GeneralButton onClick={() => {}}>시작</GeneralButton>
          </ButtonContainer>
        </>
      )}
    </Page>
  )
}

export default MyTickerDetail
