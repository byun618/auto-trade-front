import styled from '@emotion/styled'

interface SymbolStatProps {
  name: string
  data: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Name = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;

  color: #808080;
`

const Data = styled.div`
  margin-top: 5px;

  font-weight: 600;
  font-size: 12px;
  line-height: 14px;

  color: #dfdfdf;
`

export default function SymbolStat({ name, data }: SymbolStatProps) {
  return (
    <Wrapper>
      <Name>{name}</Name>
      <Data>{data}</Data>
    </Wrapper>
  )
}
