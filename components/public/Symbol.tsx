import styled from '@emotion/styled'
import Image from './Image'

const SYMBOL_SIZE = 40

interface SymbolProps {
  name: string
  koreanName: string
  imageUrl: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 16px;

  justify-content: center;
  align-items: flex-start;
`

const Korean = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;

  color: #ffffff;
`

const English = styled.div`
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;

  color: #7e7e87;
`

export default function Symbol({ name, koreanName, imageUrl }: SymbolProps) {
  return (
    <Wrapper>
      <Image
        url={imageUrl}
        alt={name}
        width={SYMBOL_SIZE}
        height={SYMBOL_SIZE}
      />
      <LabelContainer>
        <Korean>{koreanName}</Korean>
        <English>{name}</English>
      </LabelContainer>
    </Wrapper>
  )
}
