import styled from '@emotion/styled'
import { ReactNode, useMemo } from 'react'
import Button from './Button'
import Modal from './Modal'

export interface ModalButtonProps {
  text: string
  onClick: Function
}

interface ConfirmModalProps {
  isOpen: boolean
  children?: ReactNode
  main: string
  sub?: string
  buttons: ModalButtonProps[]
}

const MainWrapper = styled.div`
  & > :last-child {
    margin-bottom: 6px;
  }
`

const Main = styled.div`
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
`

const Sub = styled.div`
  text-align: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #979797;
`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
`

const ModalButton = styled(Button)<{ multiple: boolean }>`
  flex: 1;
  padding: 13px 0;
  font-weight: 700;
  font-size: 14px;
  border-radius: 20px;

  &:last-child {
    ${({ multiple }) => (multiple ? 'margin-left: 13px' : '')};
  }

  background-color: #366e88;
  color: #fff;
`

export default function ConfirmModal({
  isOpen,
  children,
  main,
  sub,
  buttons,
}: ConfirmModalProps) {
  const multiple = useMemo(() => buttons.length > 1, [buttons])

  const renderButtons = () =>
    buttons.map((button, index) => (
      <ModalButton key={index} onClick={button.onClick} multiple={multiple}>
        {button.text}
      </ModalButton>
    ))

  return (
    <Modal
      isOpen={isOpen}
      style={{
        content: {
          width: '82vw',
          backgroundColor: '#fff',
          padding: '20px 18px',
          borderRadius: 20,
          outline: 'unset',
          border: 'none',
        },
      }}
    >
      <>
        {children}
        <MainWrapper>
          <Main>
            {main.split('\n').map((text, index) => (
              <Main key={index}>{text}</Main>
            ))}
          </Main>
        </MainWrapper>
        {sub &&
          sub.split('\n').map((text, index) => <Sub key={index}>{text}</Sub>)}

        <Buttons>{renderButtons()}</Buttons>
      </>
    </Modal>
  )
}
