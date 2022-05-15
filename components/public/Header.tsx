import { HeaderProps, HeaderButtonTypes } from '../../lib/types'
import styled from '@emotion/styled'
import Arrow from '../../assets/png/arrow-white.png'
import User from '../../assets/png/user-white.png'
import Logout from '../../assets/png/logout-white.png'
import { DEFAULT_MARGIN, HEADER_HEIGHT } from '../../lib/constatns'
import Button from './Button'
import Image from './Image'

const BUTTON_IMAGE_SIZE = 19

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

  background-color: #17191c;
  padding: 0 ${DEFAULT_MARGIN}vw;
`

const HeaderContent = styled.div`
  min-width: 25%;
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

  color: #fff;
`

const Right = styled(HeaderContent)`
  justify-content: flex-end;
`

const HeaderButton = styled(Button)`
  padding: 2vw;
  color: #333;
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

  const onPressMyPage = () => {
    router.push('/my-page')
  }

  const onPressLogout = () => {
    alert('로그아웃 하시겠습니까?')
  }

  const renderButtons = (type: HeaderButtonTypes) => {
    // 작동 방식 정의 되면 구현.
    switch (type) {
      case 'back':
        return (
          <HeaderButton onClick={onPressBack}>
            <Image
              src={Arrow}
              alt="arrow"
              width={BUTTON_IMAGE_SIZE}
              height={BUTTON_IMAGE_SIZE}
            />
          </HeaderButton>
        )

      case 'my-page':
        return (
          <HeaderButton onClick={onPressMyPage}>
            <Image
              src={User}
              alt="user"
              width={BUTTON_IMAGE_SIZE}
              height={BUTTON_IMAGE_SIZE}
            />
          </HeaderButton>
        )

      case 'logout':
        return (
          <HeaderButton onClick={onPressLogout}>
            <Image
              src={Logout}
              alt="logout"
              width={BUTTON_IMAGE_SIZE}
              height={BUTTON_IMAGE_SIZE}
            />
          </HeaderButton>
        )

      default:
        return null
    }
  }

  return (
    <Wrapper ref={headerRef}>
      <Left>{left && renderButtons(left)}</Left>
      <Center>{title}</Center>
      <Right>{right && renderButtons(right)}</Right>
    </Wrapper>
  )
}
