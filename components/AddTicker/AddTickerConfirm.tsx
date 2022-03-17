import styled from '@emotion/styled'
import ConfirmModal, { ModalButtonProps } from '../public/ConfirmModal'
import Image from '../public/Image'

const TICKER_IMAGE_SIZE = 50

interface Ticker {
  name: string
  start: number
  elapse: number
}

interface AddTickerConfirmProps {
  isOpen: boolean
  buttons: ModalButtonProps[]
  ticker: Ticker
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`

const TickerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #f1f1f1;
  border-radius: 20px;
  margin-top: 20px;
  margin-bottom: 22px;
  padding: 17px 15px;
`

const TickerIcon = styled.div`
  width: ${TICKER_IMAGE_SIZE}px;
  height: ${TICKER_IMAGE_SIZE}px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  margin-left: 11px;
`

const Name = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  color: #333333;

  margin-bottom: 7px;
`

const Time = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  color: #808080;
`

export default function AddTickerConfirm({
  isOpen,
  buttons,
  ticker,
}: AddTickerConfirmProps) {
  return (
    <ConfirmModal isOpen={isOpen} main="이 설정이 맞나요?" buttons={buttons}>
      <Wrapper>
        <TickerWrapper>
          <TickerIcon>
            <Image
              src={`https://static.upbit.com/logos/${
                ticker.name.split('-')[1]
              }.png`}
              alt={ticker.name.split('-')[1]}
              width={TICKER_IMAGE_SIZE}
              height={TICKER_IMAGE_SIZE}
            />
          </TickerIcon>
          <Content>
            <Name>{ticker.name}</Name>
            <Time>
              {ticker.start}시{ticker.elapse}시간
            </Time>
          </Content>
        </TickerWrapper>
      </Wrapper>
    </ConfirmModal>
  )
}
