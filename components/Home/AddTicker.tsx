import { useState } from 'react'
import BottomSheet from '../public/BottomSheet'

interface AddTickerProps {
  isOpen: boolean
  onClose: Function
}

export default function AddTicker({ isOpen, onClose }: AddTickerProps) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} sheetHeight={300}>
      asdasd
    </BottomSheet>
  )
}
