import styled from '@emotion/styled'
import { ReactNode } from 'react'
import Sheet from 'react-modal-sheet'
import { MotionProps } from 'framer-motion'

interface BottomSheetProps {
  children: ReactNode
  isOpen: boolean
  onClose: any
  sheetHeight: any
}

const Backdrop = styled(Sheet.Backdrop)``

export default function BottomSheet({
  children,
  isOpen,
  onClose,
  sheetHeight,
}: BottomSheetProps) {
  return (
    <Sheet
      rootId="root"
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={[sheetHeight]}
      initialSnap={0}
    >
      <Sheet.Container onViewportBoxUpdate={true}>
        <Sheet.Content onViewportBoxUpdate={true}>{children}</Sheet.Content>
      </Sheet.Container>
      <Backdrop onViewportBoxUpdate={true} onTap={onClose} />
    </Sheet>
  )
}
