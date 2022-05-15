import styled from '@emotion/styled'
import { useRef } from 'react'
import { DEFAULT_MARGIN } from '../../lib/constatns'
import { PageProps } from '../../lib/types'
import Header from './Header'

type ContentProps = Partial<PageProps> & { headerHeight?: number }

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #17191c;

  min-height: 100vh;
  min-width: 100vw;
`

const Content = styled.div<ContentProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: ${({ full }) => (full ? 0 : DEFAULT_MARGIN)}vw;
  margin-top: ${({ headerHeight }) => headerHeight}px;
  background-color: #17191c;

  color: #fff;
`

export default function Page(pageProps: PageProps) {
  const { header, full = false, children } = pageProps

  const headerRef = useRef<HTMLInputElement>(null)

  return (
    <Wrapper>
      {header && (
        <Header
          router={header.router}
          title={header.title}
          left={header.left}
          right={header.right}
          headerRef={headerRef}
        />
      )}
      <Content
        headerHeight={header ? headerRef.current?.clientHeight ?? 50 : 0}
        full={full}
      >
        {children}
      </Content>
    </Wrapper>
  )
}
