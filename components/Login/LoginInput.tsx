import styled from '@emotion/styled'
import Input, { InputProps } from '../public/Input'

const Wrapper = styled(Input)`
  background: rgba(54, 110, 136, 0.3);
  border-radius: 20px;

  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #333333;
`

export default function LoginInput(props: InputProps) {
  return <Wrapper {...props} />
}
