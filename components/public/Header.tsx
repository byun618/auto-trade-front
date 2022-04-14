import styled from '@emotion/styled'
import { NextRouter } from 'next/router'
import { RefObject } from 'react'
import Arrow from '../../assets/png/arrow-white.png'
import Plus from '../../assets/png/plus.png'
import User from '../../assets/png/user.png'
import { DEFAULT_MARGIN, HEADER_HEIGHT } from '../../lib/constants'
import Button from './Button'
import Image from './Image'

const BUTTON_IMAGE_SIZE = 19

export type HeaderButtonTypes = 'back' | 'plus' | string | null

interface HeaderProps {
  router: NextRouter
  title: string
  left?: HeaderButtonTypes
  right?: HeaderButtonTypes[]
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
  padding: 0 ${DEFAULT_MARGIN}vw;

  background-color: #366e88;

  color: #f2f2f2;
`

const HeaderContent = styled.div`
  min-width: 30%;
  display: flex;
  align-items: center;
`

const Left = styled(HeaderContent)`
  justify-content: flex-start;
`

const Center = styled.div`
  flex-grow: 1;
  justify-content: center;
  align-items: center;

  font-size: 17px;
  font-weight: 600;
  text-align: center;
`

const RightWrapper = styled(HeaderContent)`
  justify-content: flex-end;
`

const Right = styled.div`
  justify-content: flex-end;
`

const HeaderButton = styled(Button)`
  padding: 2vw;
  display: flex;
  flex-direction: row;
`

export default function Header({
  router,
  title,
  left,
  right,
  headerRef,
}: HeaderProps) {
  const onPressBack = () => {
    router.back()
  }

  const onPressPlus = () => {
    router.push('/add-ticker')
  }

  const onPressUser = () => {
    router.push('/my-page')
  }

  const renderButtons = (type: HeaderButtonTypes) => {
    switch (type) {
      case 'back':
        return (
          <HeaderButton onClick={onPressBack}>
            <Image
              src={Arrow}
              alt="arrow-left"
              width={11}
              height={BUTTON_IMAGE_SIZE}
            />
          </HeaderButton>
        )
      case 'plus':
        return (
          <HeaderButton onClick={onPressPlus}>
            <Image
              src={Plus}
              alt="plus"
              width={BUTTON_IMAGE_SIZE}
              height={BUTTON_IMAGE_SIZE}
            />
          </HeaderButton>
        )
      case 'user':
        return (
          <HeaderButton onClick={onPressUser}>
            <Image
              src={User}
              alt="user"
              width={BUTTON_IMAGE_SIZE}
              height={BUTTON_IMAGE_SIZE}
            />
          </HeaderButton>
        )
    }
  }

  return (
    <Wrapper ref={headerRef}>
      <Left>{left && renderButtons(left)}</Left>
      <Center>{title}</Center>
      <RightWrapper>
        {right?.map((type, index) => (
          <Right key={index}>{renderButtons(type)}</Right>
        ))}
      </RightWrapper>
    </Wrapper>
  )
}
