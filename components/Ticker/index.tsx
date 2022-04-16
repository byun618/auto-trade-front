import styled from '@emotion/styled'
import { Ticker } from '../../lib/types'
import Button from '../public/Button'
import Image from '../public/Image'
import TickerIcon from './TickerIcon'
import Arrow from '../../assets/png/arrow-black.png'
import { ChangeEvent, useState } from 'react'
import Input from '../public/Input'
import AddProgramModal from './AddProgramModal'
import { post } from '../../lib/fetcher'

interface TickerProps {
  ticker: Ticker
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  background-color: #fff;
  border-radius: 20px;
  padding: 15px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const LabelWrapper = styled.div`
  display: flex;
`

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  margin-left: 10px;
`
const Text = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;

  color: #333333;
`

const SettingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 18px;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
`

const SettingInput = styled(Input)`
  width: 50px;
  height: 30px;
  border-bottom: 1px solid #e0e0e0;
  padding: 0;
  margin-left: 10px;
`

const SelectButton = styled(Button)`
  font-weight: 700;
  font-size: 10px;
  line-height: 12px;

  padding: 9px 16px;
  background: #366e88;
  border-radius: 20px;

  color: #fff;
`

function Ticker({ ticker }: TickerProps) {
  const [startTime, setStartTime] = useState<string>('')
  const [timeInterval, setTimeInerval] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onChangeStartTime = (e: ChangeEvent<HTMLInputElement>) => {
    const startTime = Number(e.target.value)
    if (startTime < 0 || startTime > 24) {
      alert('시작 시간은 0시부터 24시까지 입력해주세요.')
      return
    }

    setStartTime(e.target.value)
  }

  const onChangeTimeInterval = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeInerval(e.target.value)
  }

  const onClickSelect = () => {
    if (!startTime || !timeInterval) {
      alert('시작시간과 시간 간격을 입력해주세요.')
      return
    }
    setIsOpen(true)
  }

  const buttons = [
    {
      text: '취소',
      onClick: () => {
        onClickModalCancel()
      },
    },
    {
      text: '확인',
      onClick: () => {
        onClickModalSubmit()
      },
    },
  ]

  const onClickModalCancel = () => {
    setIsOpen(false)
  }

  const onClickModalSubmit = async () => {
    await post(`${process.env.NEXT_PUBLIC_API_URL}/user-programs`, {
      ticker,
      startTime: Number(startTime),
      timeInterval: Number(timeInterval),
    })

    setIsOpen(false)
  }

  return (
    <Wrapper>
      <LabelWrapper>
        <TickerIcon name={ticker.market} size={30} />
        <NameWrapper>
          <Text>{ticker.korean_name}</Text>
          <Text>{ticker.market}</Text>
        </NameWrapper>
      </LabelWrapper>
      <SettingWrapper>
        <InputWrapper>
          <Text>시작 시간</Text>
          <SettingInput
            type="number"
            name="startTime"
            value={startTime}
            onChange={onChangeStartTime}
          />
          <Text style={{ marginLeft: '15px' }}>시간 간격</Text>
          <SettingInput
            type="number"
            name="elapseTime"
            value={timeInterval}
            onChange={onChangeTimeInterval}
          />
        </InputWrapper>
        <SelectButton
          onClick={() => {
            onClickSelect()
          }}
        >
          선택
        </SelectButton>
      </SettingWrapper>
      <AddProgramModal
        isOpen={isOpen}
        buttons={buttons}
        ticker={ticker}
        startTime={startTime}
        timeInterval={timeInterval}
      />
    </Wrapper>
  )
}

export default Ticker
