import styled from '@emotion/styled'
import Button, { ButtonProps } from '../public/Button'

const Wrapper = styled(Button)<ButtonProps>`
  width: 100%;
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
`

export default function LoginButton(props: ButtonProps) {
  return <Wrapper {...props} />
}
