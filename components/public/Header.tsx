import styled from '@emotion/styled'
import { NextRouter } from 'next/router'
import { RefObject } from 'react'
import { DEFAULT_MARGIN, HEADER_HEIGHT } from '../../lib/constants'

export type HeaderButtonTypes = 'back' | 'option' | 'home' | 'notice'

interface HeaderProps {
  router?: NextRouter
  title: string
  left?: HeaderButtonTypes
  right?: HeaderButtonTypes
  headerRef: RefObject<HTMLInputElement>
}

const Wrapper = styled.div`
  position: fixed;
  overflow: hidden;
  z-index: 999;
  top: 0;

  height: ${HEADER_HEIGHT}px;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: #fff;
  padding: 0 ${DEFAULT_MARGIN}vw;
`

const Center = styled.div`
  flex-grow: 1;
  justify-content: center;
  align-items: center;

  font-size: 17px;
  font-weight: 600;
  text-align: center;

  color: #000;
`

export default function Header({
  router,
  title,
  left,
  right,
  headerRef,
}: HeaderProps) {
  return (
    <Wrapper ref={headerRef}>
      <Center>{title}</Center>
    </Wrapper>
  )
}
