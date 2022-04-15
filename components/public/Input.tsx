import styled from '@emotion/styled'
import { ChangeEventHandler } from 'react'

export interface InputProps {
  type: string
  name: string
  value: string
  placeholder?: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const Wrapper = styled.input`
  position: relative;
  border: none;
  padding: 16px 0;
  padding-left: 20px;
  width: 100%;

  &:focus {
    outline: none;
  }
`

export default function Input(props: InputProps) {
  return <Wrapper {...props} />
}
