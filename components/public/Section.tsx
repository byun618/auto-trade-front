import styled from '@emotion/styled'
import { ReactNode } from 'react'

interface SectionProps {
  title: string
  children: ReactNode
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;

  background: #1d2024;
`

const Title = styled.div`
  font-weight: 700;
  font-size: 22px;
  line-height: 26px;

  color: #ffffff;

  margin-bottom: 40px;
`

export default function Section({ title, children }: SectionProps) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {children}
    </Wrapper>
  )
}
