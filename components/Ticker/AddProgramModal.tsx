import styled from '@emotion/styled'
import ConfirmModal, { ModalButtonProps } from '../public/ConfirmModal'
import TickerIcon from '../public/TickerIcon'
import { Ticker } from './Ticker'

const TICKER_ICON_SIZE = 50

interface TickerAddModalProps {
  isOpen: boolean
  buttons: ModalButtonProps[]
  ticker: Ticker
  startTime: string
  timeInterval: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 25px 20px;
  background-color: #f1f1f1;
  border-radius: 20px;

  align-items: center;

  margin-bottom: 20px;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;

  font-weight: 600;
  font-size: 18px;
  line-height: 22px;

  & > :last-child {
    margin-top: 6px;
  }
`

const Text = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: #808080;
`

export default function AddProgramModal({
  isOpen,
  buttons,
  ticker,
  startTime,
  timeInterval,
}: TickerAddModalProps) {
  return (
    <ConfirmModal isOpen={isOpen} main="위 설정이 맞나요?" buttons={buttons}>
      <Wrapper>
        <TickerIcon name={ticker.market} size={TICKER_ICON_SIZE} />
        <TextWrapper>
          {ticker.korean_name} {ticker.market}
          <Text>
            {startTime}시부터 {timeInterval}시간
          </Text>
        </TextWrapper>
      </Wrapper>
    </ConfirmModal>
  )
}
