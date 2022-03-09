import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Navbar from './Navbar'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  min-height: 100vh;
  min-width: 100vw;
`

const Content = styled.div`
  flex-grow: 1;
  padding: 0 15vw;
`

export default function Page({ children }) {
  const router = useRouter()

  useEffect(() => {
    // 아래 예시 코드를 참조하여
    // auth를 확인하는 코드를 작성하고 사용하세요.

    const isLogined = true

    if (!isLogined) {
      //   router.replace('/login')
    }
  })

  return (
    <Wrapper>
      <Navbar />
      <Content>{children}</Content>
    </Wrapper>
  )
}
