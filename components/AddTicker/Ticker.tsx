import styled from '@emotion/styled'
import { useState } from 'react'
import Button from '../public/Button'
import Image from '../public/Image'

const TICKER_IMAGE_SIZE = 33

interface TickerProps {
  name: string
  onSelectTicker: any
  disabled: boolean
}

type StyleProps = {
  select: boolean
}

const Wrapper = styled(Button)<StyleProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffff;
  padding: 14px 12px;
  border-radius: 20px;

  ${({ select }) =>
    select &&
    `background: rgba(54, 110, 136, 0.3);
  border: 1px solid #366e88;
  box-sizing: border-box;
  border-radius: 20px;`}
`

const Name = styled.div`
  font-weight: 600;
  font-size: 10px;
  line-height: 14px;
  color: #333333;

  padding-top: 9px;
`

export default function Ticker({
  name,
  onSelectTicker,
  disabled,
}: TickerProps) {
  const [select, setSelect] = useState(false)

  const onSelect = () => {
    setSelect(!select)

    onSelectTicker(select ? null : name)
  }

  return (
    <Wrapper onClick={onSelect} disabled={disabled} select={select}>
      <Image
        src={`https://static.upbit.com/logos/${name.split('-')[1]}.png`}
        alt={name.split('-')[1]}
        width={TICKER_IMAGE_SIZE}
        height={TICKER_IMAGE_SIZE}
      />
      <Name>{name}</Name>
    </Wrapper>
  )
}
