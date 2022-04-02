import styled from '@emotion/styled'
import { RefObject } from 'react'
import { DEFAULT_MARGIN, NAVBAR_HEIGHT } from '../../lib/constants'
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
  return (
    <Wrapper ref={navbarRef} headerHeight={headerHeight}>
      <Content onClick={() => {}}>asdas</Content>
      <Content onClick={() => {}}>asdas</Content>
      <Content onClick={() => {}}>asdas</Content>
      <Content onClick={() => {}}>asdas</Content>
      <Content onClick={() => {}}>asdas</Content>
      <Content onClick={() => {}}>asdas</Content>
    </Wrapper>
  )
}
