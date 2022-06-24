import LoaderBg from 'assets/loader-bg.svg'
import LoaderImg from 'assets/loader.png'
import React, { FC } from 'react'
import styles from './styles.module.css'

export const Loader: FC = () => {
  return (
    <div className={styles.Loader}>
      {/* <img src={LoaderImg} className={styles.LoaderCircle} /> */}
      {/* <img src={LoaderBg} className={styles.LoaderBg} /> */}
    </div>
  )
}
