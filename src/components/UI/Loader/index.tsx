import LoaderBg from '@/images/loader-bg.svg'
import LoaderImg from '@/images/loader.png'
import Image from 'next/image'
import React, { FC } from 'react'
import styles from './styles.module.css'

export const Loader: FC = () => {
  return (
    <div className={styles.Loader}>
      <div className={styles.LoaderCircle}>
        <Image src={LoaderImg} layout='responsive' />
      </div>
      <div className={styles.LoaderBg}>
        <Image src={LoaderBg} layout='fixed' width='92' />
      </div>
    </div>
  )
}
