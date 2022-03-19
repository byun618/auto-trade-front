import styled from '@emotion/styled'
import axios from 'axios'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import UserTicker, {
  UserTicker as IUserTicker,
} from '../../components/Home/UserTicker'
import GeneralButton from '../../components/public/GeneralButton'
import Page from '../../components/public/Page'
import { useMe } from '../../contexts/me'
import { useSocket } from '../../contexts/socket'

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
  const { socket, connectSocket } = useSocket()
  const { myTickers } = useMe()
  const { id } = router.query
  const [userTicker, setUserTicker] = useState<IUserTicker | null>(null)

  useEffect(() => {
    connectSocket(id)
  }, [])

  useEffect(() => {
    if (myTickers) {
      const myTicker = myTickers.find((ticker) => ticker._id === id)

      if (myTicker) {
        setUserTicker(myTicker)
      }
    }
  }, [myTickers])

  useEffect(() => {
    if (socket) {
      socket.emit('init', { userTickerId: id })

      socket.on('init-res', (data) => {
        if (userTicker) {
          const { buyTime: targetDate, targetPrice } = data

          setUserTicker({ ...userTicker, targetDate, targetPrice })
        }
      })

      return () => {
        socket.disconnect()
      }
    }
  }, [socket])

  return (
    <Page router={router} headerLeft="back" headerTitle="내 티커" full>
      <Title>내 티커</Title>
      {userTicker && (
        <>
          <UserTicker userTicker={userTicker} disabled={true} />
          {/* <ButtonWrapper>
            <GeneralButton onClick={onClickInit}>초기화</GeneralButton>
          </ButtonWrapper> */}
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
