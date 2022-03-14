import styled from '@emotion/styled'
import { NextRouter } from 'next/router'
import { ReactNode, useRef } from 'react'
import { DEFAULT_MARGIN } from '../../lib/constants'
import Header, { HeaderButtonTypes } from '../public/Header'

interface PageProps {
  router?: NextRouter
  headerTitle: string
  headerLeft?: HeaderButtonTypes
  headerRight?: HeaderButtonTypes
  noHeader?: boolean
  full?: boolean
  children: ReactNode
  backgroundColor?: string
}

type ContentProps = Partial<PageProps> & { headerHeight?: any }

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 100vw;
`

const Content = styled.div<ContentProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: ${({ full }) => (full ? 0 : DEFAULT_MARGIN)}vw;
  margin-top: ${({ headerHeight }) => headerHeight}px;
  margin-bottom: ${DEFAULT_MARGIN}vw;
  background-color: ${({ backgroundColor }) => backgroundColor};
`

export default function Page({
  router,
  headerTitle,
  headerLeft,
  headerRight,
  noHeader = false,
  full = false,
  children,
  backgroundColor = '#fff',
}: PageProps) {
  const headerRef = useRef<HTMLInputElement>(null)

  return (
    <Wrapper>
      {!noHeader && (
        <Header
          router={router}
          title={headerTitle}
          left={headerLeft}
          right={headerRight}
          headerRef={headerRef}
        />
      )}
      <Content
        headerHeight={headerRef.current?.clientHeight ?? 44}
        full={full}
        backgroundColor={backgroundColor}
      >
        {children}
      </Content>
    </Wrapper>
  )
}
