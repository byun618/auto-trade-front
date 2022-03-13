import styled from '@emotion/styled'
import { useRef, useState } from 'react'
import { useSocket } from '../../contexts/socket'
import GeneralButton from '../public/GeneralButton'
import SettingInput from './SettingInput'

const Wrapper = styled.div`
  display: flex;
`

const Left = styled.div`
  display: flex;
  flex-grow: 1;

  > :not(:first-of-type) {
    margin-left: 20px;
  }
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`

const InputLabel = styled.div`
  font-size: 21px;
  line-height: 20px;
  font-weight: 700;
  margin-right: 10px;
`

export default function Setting() {
  const { socket } = useSocket()
  const [ticker, setTicker] = useState<string>('KRW-BTC')
  const [start, setStart] = useState<string>('9')
  const [elapse, setElapse] = useState<string>('24')

  const tickerRef = useRef<string>(null)
  const startRef = useRef<string>(null)
  const elapseRef = useRef<string>(null)

  const onChangeTicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicker(e.target.value)
  }
  const onChangeStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStart(e.target.value)
  }
  const onChangeElapse = (e: React.ChangeEvent<HTMLInputElement>) => {
    setElapse(e.target.value)
  }

  const onClick = () => {
    if (!socket) {
      alert('소켓 연결이 되어 있지 않습니다.')
      return
    }

    socket.emit('init', {
      ticker,
      start,
      elapse,
    })
  }

  return (
    <Wrapper>
      <Left>
        <InputWrapper>
          <InputLabel>티커</InputLabel>
          <SettingInput
            inputRef={tickerRef}
            type="text"
            name="ticker"
            value={ticker}
            onChange={onChangeTicker}
          />
        </InputWrapper>

        <InputWrapper>
          <InputLabel>시작 시간</InputLabel>
          <SettingInput
            inputRef={startRef}
            type="text"
            name="start"
            value={start}
            onChange={onChangeStart}
          />
        </InputWrapper>

        <InputWrapper>
          <InputLabel>경과</InputLabel>
          <SettingInput
            inputRef={elapseRef}
            type="text"
            name="elapse"
            value={elapse}
            onChange={onChangeElapse}
          />
        </InputWrapper>
      </Left>

      <GeneralButton onClick={onClick}>시작하기</GeneralButton>
    </Wrapper>
  )
}
