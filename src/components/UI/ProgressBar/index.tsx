import { motion } from 'framer-motion'
import React, { FC } from 'react'

interface iProps {
  progress: number
  text: number
}

export const ProgressBar: FC<iProps> = ({ progress, text }) => {
  return (
    <>
      <div className="mt-2">
        <motion.div
          layout="size"
          style={{
            width: `${progress}%`,
            borderRadius: '0.4rem'
          }}
          className="border-4 h-6 bg-red-500 border-purple"
        ></motion.div>
        <p className="text-center text-lg font-semibold bg-gray-900 w-min m-auto px-2 rounded-xl bg-opacity-30 mt-2 flex items-end">
          {text} <span className="text-sm relative bottom-0.5">s</span>
        </p>
      </div>
    </>
  )
}
