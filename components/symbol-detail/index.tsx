import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useGlobal } from '../../contexts/global'
import useSocket from '../../hooks/useSocket'
import B from '../public/Button'
import Section from '../public/Section'
import Symbol from '../public/Symbol'
import PricePannel from './PricePannel'
import SymbolStat from './SymbolStat'

interface SymbolDetail {
  userSymbol: any
}

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`

const SymbolWrapper = styled.div`
  flex-grow: 1;
`

const PnlRoe = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;

  color: #62c278;
`

const ControlPannel = styled.div`
  display: flex;
  margin-top: 15px;

  & > :not(:first-of-type) {
    margin-left: 10px;
  }
`

const PrioceWrapper = styled.div`
  margin-top: 20px;
`

const Button = styled(B)<{ backgroundColor?: string }>`
  padding: 8px 24px;

  border-radius: 5px;

  font-weight: 700;
  font-size: 14px;
  line-height: 17px;

  background: ${({ backgroundColor }) => backgroundColor ?? '#555B67;'};

  color: ${({ color }) => color ?? '#dfdfdf;'};
`

const SymbolStatWrapper = styled.div`
  display: flex;

  justify-content: space-between;

  margin-top: 20px;
`

export default function SymbolDetail({ userSymbol }: SymbolDetail) {
  const { token } = useGlobal()

  const [entryPrice, setEntryPrice] = useState<number>(123)
  const [size, setSize] = useState<number>(123)
  const [leverage, setLeverage] = useState<number>(123)
  const [liqPrice, setLiqPrice] = useState<number>(123)
  const [margin, setMargin] = useState<number>(123)

  const test = () => {
    console.log(1)
  }

  return (
    <Section title="프로그램">
      <HeaderWrapper>
        <SymbolWrapper>
          <Symbol {...userSymbol.symbol} />
        </SymbolWrapper>
        <PnlRoe>
          +0.06 USDT
          <br />
          (+11.53%)
        </PnlRoe>
      </HeaderWrapper>
      <ControlPannel>
        <Button onClick={test}>시작</Button>
        <Button onClick={test}>종료</Button>
        <Button onClick={test}>수정</Button>
      </ControlPannel>
      <ControlPannel>
        <Button backgroundColor="#62c278" onClick={test}>
          메수 중지
        </Button>
        <Button backgroundColor="#d54155" onClick={test}>
          매도 중지
        </Button>
      </ControlPannel>
      <PrioceWrapper>
        <PricePannel />
      </PrioceWrapper>
      <SymbolStatWrapper>
        <SymbolStat name="진입 금액" data={entryPrice.toLocaleString()} />
        <SymbolStat name="사이즈" data={`+${size} EOS`} />
        <SymbolStat name="레버리지" data={`${leverage}X`} />
        <SymbolStat name="청산 금액" data={liqPrice.toLocaleString()} />
        <SymbolStat name="마진" data={`${margin.toLocaleString()} USDT`} />
      </SymbolStatWrapper>
    </Section>
  )
}
