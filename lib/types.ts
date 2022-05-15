import { NextRouter } from 'next/router'
import { ReactNode, RefObject } from 'react'

export type HeaderButtonTypes = 'back' | 'my-page' | 'logout'

export interface PageHeaderProps {
  router: NextRouter
  title: string
  left?: HeaderButtonTypes
  right?: HeaderButtonTypes
}

export interface HeaderProps extends PageHeaderProps {
  headerRef: RefObject<HTMLInputElement>
}

export interface PageProps {
  header?: PageHeaderProps
  full?: boolean
  children: ReactNode
}
