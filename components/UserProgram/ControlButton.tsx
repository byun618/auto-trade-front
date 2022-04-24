import styled from '@emotion/styled'
import Button from '../public/Button'

interface ControlButtonProps {
  name: string
  onClick: () => void
  disabled?: boolean
}

const Wrapper = styled(Button)<{ disabled: boolean }>`
  ${({ disabled }) =>
    disabled ? 'background: rgba(54, 110, 136, 0.3);' : 'background: #366e88;'}
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;

  padding: 7px 15px;

  font-weight: 500;
  font-size: 10px;
  line-height: 12px;

  color: #ffffff;
`

function ControlButton({ name, onClick, disabled }: ControlButtonProps) {
  return (
    <Wrapper onClick={onClick} disabled={disabled as boolean}>
      {name}
    </Wrapper>
  )
}

export default ControlButton
