import styled from '@emotion/styled'
import { NextRouter } from 'next/router'
import { ReactNode, useMemo, useRef } from 'react'
import { DEFAULT_MARGIN } from '../../lib/constants'
import Header, { HeaderButtonTypes } from './Header'
import Navbar from './Navbar'

interface PageProps {
  router: NextRouter
  headerTitle: string
  headerLeft?: HeaderButtonTypes
  headerRight?: HeaderButtonTypes[]
  noHeader?: boolean
  noNavbar?: boolean
  full?: boolean
  children: ReactNode
  backgroundColor?: string
}

type ContentProps = Partial<PageProps> & { headerHeight?: number }

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
  background-color: ${({ backgroundColor }) => backgroundColor};
`

export default function Page({
  router,
  headerTitle,
  headerLeft,
  headerRight,
  noHeader = false,
  noNavbar = false,
  full = false,
  children,
  backgroundColor = '#f1f1f1',
}: PageProps) {
  const headerRef = useRef<HTMLInputElement>(null)
  const navbarRef = useRef<HTMLInputElement>(null)
  const headerHeight = useMemo(() => {
    if (noHeader) {
      return 0
    } else {
      return headerRef.current?.clientHeight ?? 50
    }
  }, [])

  const navHeight = useMemo(() => {
    if (noNavbar) {
      return 0
    } else {
      return navbarRef.current?.clientHeight ?? 40
    }
  }, [])

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
      {!noNavbar && (
        <Navbar headerHeight={headerHeight} navbarRef={navbarRef} />
      )}
      <Content
        headerHeight={headerHeight + navHeight}
        full={full}
        backgroundColor={backgroundColor}
      >
        {children}
      </Content>
    </Wrapper>
  )
}
