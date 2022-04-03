import React, { ReactNode } from 'react'
import ReactModal from 'react-modal'

interface ModalProps {
  children: ReactNode
  isOpen: boolean
  style?: object
}

export default function Modal({ children, isOpen, style }: ModalProps) {
  ReactModal.defaultStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999,
    },
    // content: null,
  }

  return (
    <ReactModal isOpen={isOpen} style={style} ariaHideApp={false}>
      {children}
    </ReactModal>
  )
}
