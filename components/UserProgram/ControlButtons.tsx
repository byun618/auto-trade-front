import styled from '@emotion/styled'
import Button from '../public/Button'

interface ControlButtonsProps {
  buttons: any[]
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 10px;

  & > :not(:first-of-type) {
    margin-left: 10px;
  }
`

const ControlButton = styled(Button)<{ disabled: boolean }>`
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

function ControlButtons({ buttons }: ControlButtonsProps) {
  return (
    <Wrapper>
      {buttons.map((button, index) => (
        <ControlButton
          key={index}
          onClick={button.onClick}
          disabled={button.disabled}
        >
          {button.name}
        </ControlButton>
      ))}
    </Wrapper>
  )
}

export default ControlButtons
