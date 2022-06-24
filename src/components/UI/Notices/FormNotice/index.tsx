import WarningIcon from 'assets/warning.svg'
import { AnimatePresence, motion } from 'framer-motion'
import React, { FC } from 'react'
import styles from './styles.module.css'

interface iProps {
  variant: 'error' | 'success'
  message: string
}

export const FormNotice: FC<iProps> = ({ variant, message }) => {
  return (
    <AnimatePresence>
      <motion.div
        className={styles.FormNotice}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
        key='form-notice'
      >
        {/* <img src={WarningIcon} width='24' height='24' /> */}
        <p>{message}</p>
      </motion.div>
    </AnimatePresence>
  )
}
