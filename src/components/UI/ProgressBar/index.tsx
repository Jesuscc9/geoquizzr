import { motion } from 'framer-motion'
import React, { FC } from 'react'

interface iProps {
  progress: number
  text: number
}

export const ProgressBar: FC<iProps> = ({ progress, text }) => {
  return (
    <>
      <p>{text}</p>
      <motion.div
        layout="size"
        style={{
          width: `${progress}%`,
          height: 20,
          backgroundColor: 'red',
          borderRadius: '0.4rem'
        }}
      ></motion.div>
    </>
  )
}
