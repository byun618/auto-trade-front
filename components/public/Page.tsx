import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { LAYOUT_PADDING_HORIZONTAL } from '../../lib/constants'
import NavBar from './Navbar'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`

const Content = styled.div`
  flex-grow: 1;
  padding: 0 ${LAYOUT_PADDING_HORIZONTAL}vw;
`

export default function Page({ children }: { children: ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    // 아래 예시 코드를 참조하여
    // auth를 확인하는 코드를 작성하고 사용하세요.

    const isLogined = true

    if (!isLogined) {
      router.replace('/login')
    }
  })

  return (
    <Wrapper>
      <NavBar />
      <Content>{children}</Content>
    </Wrapper>
  )
}
