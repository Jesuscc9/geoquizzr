import { AnimatePresence, motion } from 'framer-motion'
import React, { FC, ReactNode, useEffect, useState } from 'react'
import styles from './styles.module.css'

export const ClueWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false)
    }, 3200)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <>
            <motion.div
              className={styles.Overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsVisible(false)
              }}
            ></motion.div>
            <motion.div
              className={styles.Clue}
              initial={{ x: '120vw', y: '-50%' }}
              animate={{ x: '-50%', y: '-50%' }}
              exit={{ x: '-120vw', y: '-50%' }}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
