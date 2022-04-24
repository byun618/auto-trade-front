import styled from '@emotion/styled'
import Image from './Image'
import { LOADING_DEFAULT_SIZE } from '../../lib/constants'
import LoadingGif from '../../assets/gif/loading.gif'

interface LoadingProps {
  width?: number
  height?: number
}

const Wrapper = styled('div')<LoadingProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`

export default function Loading({
  width = LOADING_DEFAULT_SIZE,
  height = LOADING_DEFAULT_SIZE,
}: LoadingProps) {
  return (
    <Wrapper width={width} height={height}>
      <Image src={LoadingGif} alt="loading" width={width} height={height} />
    </Wrapper>
  )
}
