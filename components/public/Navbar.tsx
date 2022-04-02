import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { RefObject, useCallback } from 'react'
import { DEFAULT_MARGIN, NAVBAR_HEIGHT } from '../../lib/constants'
import nav from '../../lib/nav'
import Button from './Button'

interface NavbarProps {
  headerHeight: number
  navbarRef: RefObject<HTMLInputElement>
}

const Wrapper = styled.div<{ headerHeight: number }>`
  position: fixed;
  overflow: scroll;
  z-index: 999;
  top: ${({ headerHeight }) => headerHeight}px;

  ::-webkit-scrollbar {
    display: none;
  }

  width: 100%;
  height: ${NAVBAR_HEIGHT}px;

  display: flex;
  flex-direction: row;
  align-items: center;
  //   padding: 0 ${DEFAULT_MARGIN}vw;

  background-color: #366e88;
`

const Content = styled(Button)`
  padding: 0 ${DEFAULT_MARGIN}vw;
  font-weight: 400;

  color: #dfdfdf;
`

export default function Navbar({ headerHeight, navbarRef }: NavbarProps) {
  const router = useRouter()

  const goPage = useCallback(
    (path: string) => {
      router.push(path)
    },
    [router],
  )

  return (
    <Wrapper ref={navbarRef} headerHeight={headerHeight}>
      {nav.map((item, index) => (
        <Content
          key={index}
          onClick={() => {
            goPage(`${item.path}`)
          }}
        >
          {item.title}
        </Content>
      ))}
    </Wrapper>
  )
}
