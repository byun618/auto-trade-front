import styled from '@emotion/styled'
import { ChangeEvent, useState } from 'react'
import BottomSheet from '../public/BottomSheet'
import GeneralButton from '../public/GeneralButton'
import Image from '../public/Image'
import Input from '../public/Input'

const TICKER_IMAGE_SIZE = 50

interface TickerBottomSheet {
  isOpen: boolean
  ticker: string
  start: string
  elapse: string
  onClose: Function
  onChangeStart: Function
  onChangeElapse: Function
}

const Wrapper = styled.div`
  disply: flex;
  flex-direction: column;
  margin-top: 20px;
  padding: 0 18px;
`

const Text = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  color: #333333;
`

const Header = styled.div`
  display: flex;
  padding: 0 7px;
  align-items: center;
`

const Name = styled(Text)`
  padding-left: 10px;
`

const ContentWrapper = styled.div`
  display: flex;
  margin-top: 15px;
  padding-left: 7px;
  align-items: center;
`

const ButtonContainer = styled.div`
  margin-top: 30px;
`

export default function TickerBottomSheet({
  ticker,
  isOpen,
  start,
  elapse,
  onClose,
  onChangeStart,
  onChangeElapse,
}: TickerBottomSheet) {
  // const [start, setStart] = useState<string>('9')
  // const [elapse, setElapse] = useState<string>('24')

  // const onChangeStart = (e: ChangeEvent<HTMLInputElement>) => {
  //   setStart(e.target.value)
  // }

  // const onChangeElapse = (e: ChangeEvent<HTMLInputElement>) => {
  //   setElapse(e.target.value)
  // }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} sheetHeight={250}>
      <Wrapper>
        <Header>
          <Image
            src={`https://static.upbit.com/logos/${ticker.split('-')[1]}.png`}
            alt={ticker.split('-')[1]}
            width={TICKER_IMAGE_SIZE}
            height={TICKER_IMAGE_SIZE}
          />
          <Name>{ticker}</Name>
        </Header>
        <ContentWrapper>
          <Text>시작 시간</Text>
          <Input
            type="number"
            name="start"
            value={start}
            onChange={onChangeStart}
            style={{ width: '80px', marginLeft: '15px', textAlign: 'center' }}
          />
        </ContentWrapper>
        <ContentWrapper>
          <Text>시간 간격</Text>
          <Input
            type="number"
            name="elapse"
            value={elapse}
            onChange={onChangeElapse}
            style={{ width: '80px', marginLeft: '15px', textAlign: 'center' }}
          />
        </ContentWrapper>
        <ButtonContainer>
          <GeneralButton onClick={onClose}>완료</GeneralButton>
        </ButtonContainer>
      </Wrapper>
    </BottomSheet>
  )
}
