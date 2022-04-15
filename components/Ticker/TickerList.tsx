import styled from '@emotion/styled'
import Ticker from './'
import { Ticker as TickerType } from '../../lib/types'

interface TickerListProps {
  tickers: TickerType[]
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 30px;

  & > :not(:first-of-type) {
    margin-top: 15px;
  }
`

function TickerList({ tickers }: TickerListProps) {
  return (
    <Wrapper>
      {tickers.map((ticker, index) => (
        <Ticker key={index} ticker={ticker} />
      ))}
    </Wrapper>
  )
}

export default TickerList
