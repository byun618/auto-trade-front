import type { NextPage } from 'next'
import styled from '@emotion/styled'

interface LoginInputProps {
  style?: object
  type: string
  name: string
  value: any
  placeholder?: string
  onChange: any
}

const Wrapper = styled.input`
  position: relative;
  border: none;
  border-radius: 20px;
  padding: 16px 0;
  padding-left: 20px;
  background: rgba(54, 110, 136, 0.3);
  width: 100%;

  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  color: #333333;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: 808080;
  }
`

const LoginInput: NextPage<LoginInputProps> = (props) => {
  return <Wrapper {...props} />
}

export default LoginInput
