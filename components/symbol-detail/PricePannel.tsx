import styled from '@emotion/styled'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  background: #212428;
  border-radius: 20px;
`

const Profit = styled.div`
  padding-top: 14px;
  padding-right: 14px;

  text-align: right;

  font-weight: 600;
  font-size: 12px;
  line-height: 14px;

  color: #dfdfdf;
`

const BarWrapper = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;

  padding: 0 20px;
`

const Bar = styled.div`
  display: flex;

  height: 21px;

  background: #d9d9d9;
  border-radius: 20px;

  padding: 0 20%;

  justify-content: space-between;
`

const Pointer = styled.div<{ background: string }>`
  display: flex;
  flex-direction: column;

  align-items: center;

  position: relative;
  top: -60%;

  width: 8px;
  height: 50px;

  background: ${({ background }) => background};
  border-radius: 10px;
`

const PointerValue = styled.div<{ bottom?: boolean }>`
  position: relative;

  ${({ bottom }) => (bottom ? 'bottom: -100%' : 'top: -50%')};

  font-weight: 600;
  font-size: 15px;
  line-height: 18px;

  color: #dfdfdf;
`

const HighNLow = styled.div`
  display: flex;

  margin: 0 -10px;
  margin-top: 10px;

  justify-content: space-between;

  font-weight: 600;
  font-size: 15px;
  line-height: 18px;
`

const Low = styled.div`
  color: #62c278;
`

const High = styled.div`
  color: #d54155;
`

export default function PricePannel() {
  return (
    <Wrapper>
      <Profit>1.25%</Profit>
      <BarWrapper>
        <Bar>
          <Pointer background="#62c278">
            <PointerValue>31878.5</PointerValue>
          </Pointer>
          <Pointer background="#e0b024">
            <PointerValue bottom>31878.5</PointerValue>
          </Pointer>
          <Pointer background="#d54155">
            <PointerValue>31878.5</PointerValue>
          </Pointer>
        </Bar>
        <HighNLow>
          <Low>31878.5</Low>
          <High>31878.5</High>
        </HighNLow>
      </BarWrapper>
    </Wrapper>
  )
}
