import styled from '@emotion/styled'
import { Ticker } from '../../lib/types'
import Button from '../public/Button'
import Image from '../public/Image'
import TickerIcon from './TickerIcon'
import Arrow from '../../assets/png/arrow-black.png'

interface TickerProps {
  ticker: Ticker
}

const Wrapper = styled(Button)`
  display: flex;
  justify-content: flex-start;

  width: 100%;
  background-color: white;
  border-radius: 20px;
  padding: 15px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const NameWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: start;

  margin-left: 10px;
`
const Name = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;

  color: #333333;
`

function Ticker({ ticker }: TickerProps) {
  return (
    <Wrapper
      onClick={() => {
        console.log('1')
      }}
    >
      <TickerIcon name={ticker.market} size={30} />
      <NameWrapper>
        <Name>{ticker.korean_name}</Name>
        <Name>{ticker.market}</Name>
      </NameWrapper>
    </Wrapper>
  )
}

export default Ticker
