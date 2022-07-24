import styled from '@emotion/styled'
import { useEffect, useState } from 'react'
import { useGlobal } from '../../contexts/global'
import useSocket from '../../hooks/useSocket'
import B from '../public/Button'
import Section from '../public/Section'
import Symbol from '../public/Symbol'
import PricePannel from './PricePannel'
import SymbolStat from './SymbolStat'

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
`

const SymbolWrapper = styled.div`
  flex-grow: 1;
`

const PnlRoe = styled.div<{ value: number }>`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;

  color: ${({ value }) =>
    value === 0 ? '#7e7e87' : value > 0 ? '#62c278;' : '#d54155'};
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

export default function SymbolDetail() {
  const { token } = useGlobal()
  const { userSymbol, userSymbolPosition } = useGlobal()
  const { socket, connect } = useSocket(userSymbol._id, token as string)

  const [entryPrice, setEntryPrice] = useState<number>(123)
  const [size, setSize] = useState<number>(123)
  const [liqPrice, setLiqPrice] = useState<number>(123)
  const [margin, setMargin] = useState<number>(123)

  useEffect(() => {
    connect()
  }, [])

  const test = () => {
    console.log(1)
  }

  const onClickStart = () => {
    if (socket) {
      socket.emit('start')
    }
  }

  const onClickStop = () => {
    if (socket) {
      socket.emit('stop')
    }
  }

  return (
    <Section title="프로그램">
      <HeaderWrapper>
        <SymbolWrapper>
          <Symbol {...userSymbol.symbol} />
        </SymbolWrapper>
        <PnlRoe value={userSymbolPosition.pnl}>
          {userSymbolPosition.pnl} USDT
          <br />({userSymbolPosition.roe}%)
        </PnlRoe>
      </HeaderWrapper>
      <ControlPannel>
        <Button onClick={onClickStart} disabled={userSymbol.started}>
          시작
        </Button>
        <Button onClick={onClickStop} disabled={!userSymbol.started}>
          종료
        </Button>
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
        <SymbolStat
          name="진입 금액"
          data={userSymbolPosition.entryPrice.toLocaleString()}
        />
        <SymbolStat name="사이즈" data={`${userSymbolPosition.size} EOS`} />
        <SymbolStat
          name="청산 금액"
          data={userSymbolPosition.liqPrice.toLocaleString()}
        />
        <SymbolStat
          name="마진"
          data={`${userSymbolPosition.margin.toLocaleString()} USDT`}
        />
      </SymbolStatWrapper>
    </Section>
  )
}
