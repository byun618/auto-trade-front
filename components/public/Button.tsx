import styled from '@emotion/styled'
import { debounce } from 'lodash'
import { CSSProperties, ReactNode } from 'react'

interface ButtonProps {
  onClick: Function
  children: ReactNode
  disabled?: boolean
  loading?: boolean
  style?: object
  className?: string
}

const Wrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;

  border: none;
  padding: 0;
  margin: 0;

  :enabled:active {
    opacity: 0.8 !important;
    transform: scale(0.98) !important;
  }
`

// TODO: any 나중에 수정할 것
export default function Button(props: CSSProperties & ButtonProps) {
  const { onClick, disabled, children, className }: ButtonProps = props

  const handleClick = debounce(
    () => {
      if (onClick && !disabled) {
        onClick()
      }
    },
    500,
    {
      leading: true,
      trailing: false,
    },
  )

  return (
    <Wrapper onClick={handleClick} disabled={disabled} className={className}>
      {children}
    </Wrapper>
  )
}
