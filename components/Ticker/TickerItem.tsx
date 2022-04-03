import styled from '@emotion/styled'
import Button from '../public/Button'
import GeneralButton from '../public/GeneralButton'
import TickerIcon from '../public/TickerIcon'

export type TickerItem = {
  market: string
  korean_name: string
  english_name: string
}

interface TickerItemProps {
  tickerItem: TickerItem
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background-color: white;
  border-radius: 20px;
  padding: 10px;
`

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;

  font-weight: 600;
  font-size: 12px;
  line-height: 14px;

  color: #333333;

  flex-grow: 1;
`

const Name = styled.div``

const SelectButton = styled(Button)`
  border-width: 0;
  border-radius: 20px;
  padding: 9px 16px;

  font-weight: 700;
  font-size: 10px;
  line-height: 12px;
  color: #fff;
  background-color: #366e88;
`

function TickerItem({ tickerItem }: TickerItemProps) {
  return (
    <Wrapper>
      <TickerIcon name={tickerItem.market} size={30} />
      <NameWrapper>
        <Name>{tickerItem.korean_name}</Name>
        <Name>{tickerItem.market}</Name>
      </NameWrapper>
      <SelectButton onClick={() => {}}>선택</SelectButton>
    </Wrapper>
  )
}

export default TickerItem
