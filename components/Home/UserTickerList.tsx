import styled from '@emotion/styled'
import { useEffect } from 'react'
import { useMe } from '../../contexts/me'
import MyTicker from './UserTicker'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > :not(:last-child) {
    margin-bottom: 20px;
  }
`

export default function UserTickerList() {
  const { myTickers, fetchMyTickers } = useMe()

  useEffect(() => {
    fetchMyTickers()
  }, [])

  return (
    <Wrapper>
      {myTickers.map((myTicker, index) => (
        <MyTicker key={index} userTicker={myTicker} />
      ))}
    </Wrapper>
  )
}
