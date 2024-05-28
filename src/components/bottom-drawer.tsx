import { ReactNode } from 'react'
import { Modal } from 'react-native'

interface BottomDrawerProps {
  open: boolean
  closeDrawer: () => void
  children: ReactNode
}

export function BottomDrawer({
  open,
  closeDrawer,
  children,
}: BottomDrawerProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={closeDrawer}
    >
      {children}
    </Modal>
  )
}
