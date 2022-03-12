import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: 0 15vw;
`

const Button = styled.button`
  outline: none;
  border: none;
  background-color: transparent;

  padding: 0;
  margin: 0;

  color: #fff;
  opacity: 0.6;

  :hover {
    opacity: 0.9;
  }

  :enabled:active {
    transform: scale(0.95) !important;
  }
`

const Logo = styled.button`
  outline: none;
  border: none;
  background-color: transparent;

  padding: 0;
  margin: 0;

  font-size: 1.25rem;
  font-weight: 500;

  color: #fff;
  margin-right: 1rem;
`

const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  padding: 0 1vw;

  > :not(:first-child) {
    margin-left: 1rem;
  }
`

const Footer = styled.div`
  > :not(:first-child) {
    margin-left: 1rem;
  }
`

export default function Navbar() {
  const router = useRouter()

  const goPage = useCallback(
    (link) => {
      router.push(link)
    },
    [router],
  )

  return (
    <nav className="navbar bg-info">
      <Container>
        <Logo onClick={() => goPage('/')}>Auto Trade</Logo>
        <Content>
          {/* <Button onClick={() => goPage('/review')}>가즈아</Button> */}
        </Content>
        <Footer>
          <Button onClick={() => goPage('/login')}>로그인</Button>
        </Footer>
      </Container>
    </nav>
  )
}
