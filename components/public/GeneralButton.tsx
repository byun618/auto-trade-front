import styled from '@emotion/styled'
import { CSSProperties, ReactNode } from 'react'
import Button from './Button'

interface ButtonProps {
  onClick: Function
  children: ReactNode
  disabled?: boolean
  loading?: boolean
  style?: object
  className?: string
}

const Wrapper = styled(Button)<ButtonProps>`
  border-width: 0;
  ${({ disabled }) =>
    disabled
      ? 'background: rgba(54, 110, 136, 0.3);'
      : 'background-color: #366e88;'}

  color: #fff;
  border-radius: 20px;
  padding: 16px 18px;

  font-weight: 700;
  font-size: 15px;
  line-height: 18px;

  width: 100%;
`

export default function GeneralButton(props: CSSProperties & ButtonProps) {
  const { onClick, disabled, children, className }: ButtonProps = props
  return (
    <Wrapper onClick={onClick} disabled={disabled} className={className}>
      {children}
    </Wrapper>
  )
}
