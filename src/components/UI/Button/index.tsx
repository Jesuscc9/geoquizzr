import { HTMLMotionProps, motion } from 'framer-motion'
import React, { FC, ReactNode } from 'react'
import PulseLoader from 'react-spinners/BeatLoader'
import styles from './styles.module.css'

type iProps = HTMLMotionProps<'button'> & {
  loading?: boolean
  variant?: 'primary' | 'outline'
  color?: string
  children?: ReactNode
}

export const Button: FC<iProps> = ({
  loading = false,
  variant = 'primary',
  color = '#6cb928',
  className,
  children,
  ...props
}) => {
  if (variant === 'outline') color = '#fff'

  return (
    <motion.button
      {...props}
      className={`${styles.Button} ${className}`}
      style={{
        color,
        backgroundColor:
          variant === 'primary' ? color : 'rgba(255, 255, 255, 0)',
        border: variant === 'primary' ? 0 : '1px solid'
      }}
      whileHover={{
        filter: 'brightness(1.15)',
        transition: { duration: 0.1 }
      }}
    >
      <div style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.2s' }}>
        {children}
      </div>
      <div
        style={{
          position: 'absolute',
          opacity: loading ? 1 : 0,
          transition: 'opacity 0.2s'
        }}
      >
        <PulseLoader size={10} color="#fff" />
      </div>
    </motion.button>
  )
}
