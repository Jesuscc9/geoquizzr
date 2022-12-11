import { ReactPortal } from '../../../components/UI'
import { AnimatePresence, motion } from 'framer-motion'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import styles from './styles.module.css'

const { modal, background } = styles

export const Modal: FC<{
  show: boolean
  children: ReactNode
  onClose?: () => void
  onCloseModal: any
  showCloseIcon?: boolean
  title?: string
  className?: string
  overflowAuto?: boolean
  allowClose?: boolean
}> = ({
  show,
  onCloseModal,
  children,
  showCloseIcon = true,
  title,
  className = '',
  overflowAuto = false,
  allowClose
}) => {
  const [showModal, setShowModal] = useState<boolean>(show)

  useEffect(() => {
    setShowModal(show)
  }, [show])

  useEffect(() => {
    if (showModal === false) onCloseModal()
  }, [showModal])

  useEffect(() => {
    const escFn = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') setShowModal(false)
    }
    document.addEventListener('keydown', escFn, false)
    return () => {
      document.removeEventListener('keydown', escFn, false)
    }
  }, [])

  return (
    <>
      <ReactPortal wrapperId="modal-wrapper">
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0, zIndex: 99 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'absolute', top: 0, left: 0 }}
            >
              <div
                className={background}
                onClick={() => {
                  if (allowClose) setShowModal(false)
                }}
              />
              <motion.div
                layoutId="modal-content"
                className={`${modal} ${className}`}
                style={{
                  overflowY: overflowAuto === true ? 'auto' : 'visible'
                }}
              >
                <div
                  className={`close-button w-full flex justify-end items-center text-gray-300 ${
                    title && 'mb-6 justify-between'
                  }`}
                >
                  {title && (
                    <p className="text-lg text-indigo-800 font-medium">
                      {title}
                    </p>
                  )}
                  {showCloseIcon && <p>Cerrar</p>}
                </div>
                {children}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </ReactPortal>
    </>
  )
}
