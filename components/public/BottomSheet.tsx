import { ReactNode } from 'react'
import Sheet from 'react-modal-sheet'

interface BottomSheetProps {
  children: ReactNode
  isOpen: boolean
  onClose: any
  sheetHeight: any
}

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
      <Sheet.Backdrop onViewportBoxUpdate={true} onTapCancel={onClose} />
      <Sheet.Container onViewportBoxUpdate={true}>
        <Sheet.Content onViewportBoxUpdate={true}>{children}</Sheet.Content>
      </Sheet.Container>
    </Sheet>
  )
}
