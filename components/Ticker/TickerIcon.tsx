import styled from '@emotion/styled'
import Image from '../public/Image'

interface TickerIconProps {
  name: string
  size: number
}

type WrapperProps = {
  size: number
}

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`

export default function TickerIcon(props: TickerIconProps) {
  const { name, size } = props

  return (
    <Wrapper size={size}>
      <Image
        url={`https://static.upbit.com/logos/${name.split('-')[1]}.png`}
        alt={name.split('-')[1]}
        width={size}
        height={size}
      />
    </Wrapper>
  )
}
