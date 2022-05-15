import styled from '@emotion/styled'
import { debounce } from 'lodash'
import { CSSProperties, ReactNode } from 'react'
import { LOADING_DEFAULT_SIZE } from '../../lib/constatns'
import Loading from './Loading'

interface ButtonProps {
  key?: string
  onClick: any // native event onclick 포함하도록 타입 설정 필요
  children: ReactNode
  disabled?: boolean
  loading?: boolean
  indicatorSize?: number
  style?: object
  className?: string
}

const Wrapper = styled.button<Partial<ButtonProps>>`
  display: flex;
  background-color: transparent;

  border-width: 0px;
  padding: 0;
  margin: 0;

  ${'' /* iOS 웹뷰에서 요소 클릭 시 배경색 지정 해제 */}
  -webkit-tap-highlight-color: transparent;

  ${'' /* iOS 15 이상에서 글씨 색 변경 방지*/}
  color: #000;

  :enabled:active {
    opacity: 0.8 !important;
    transform: scale(0.99) !important;
  }
`

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function Button(props: CSSProperties & ButtonProps) {
  const {
    onClick,
    disabled,
    loading,
    indicatorSize = LOADING_DEFAULT_SIZE,
    style,
    children,
    className,
  }: ButtonProps = props

  const handleClick = debounce(
    (e) => {
      if (onClick && !disabled) {
        onClick(e)
      }
    },
    500,
    {
      leading: true,
      trailing: false,
    },
  )

  return (
    <Wrapper
      onClick={handleClick}
      disabled={disabled || loading}
      className={className}
      style={style}
    >
      {loading ? (
        <LoadingContainer>
          <Loading width={indicatorSize} height={indicatorSize} />
        </LoadingContainer>
      ) : (
        children
      )}
    </Wrapper>
  )
}
