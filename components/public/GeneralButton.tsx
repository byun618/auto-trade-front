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

const Wrapper = styled(Button)`
  border-width: 0;
  background-color: #62c3ec;
  color: #fff;
  border-radius: 20px;
  padding: 10px 18px;
  font-size: 15px;
  line-height: 20px;
  font-weight: 700;
`

export default function GeneralButton(props: CSSProperties & ButtonProps) {
  const { onClick, disabled, children, className }: ButtonProps = props
  return (
    <Wrapper onClick={onClick} disabled={disabled} className={className}>
      {children}
    </Wrapper>
  )
}
