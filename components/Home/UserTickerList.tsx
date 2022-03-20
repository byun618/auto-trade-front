import styled from '@emotion/styled'
import { useEffect } from 'react'
import { useMe } from '../../contexts/me'
import UserTicker from './UserTicker'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > :not(:last-child) {
    margin-bottom: 20px;
  }
`

export default function UserTickerList() {
  const { userTickers, fetchUserTickers } = useMe()

  useEffect(() => {
    fetchUserTickers()
  }, [])

  return (
    <Wrapper>
      {userTickers.map((userTicker, index) => (
        <>
          <UserTicker key={index} userTicker={userTicker} />
        </>
      ))}
    </Wrapper>
  )
}
