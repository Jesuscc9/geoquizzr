// import LoaderBg from '../../../../public/assets/images/loader-bg.svg'
import LoaderBg from '../../../assets/images/loader-bg.svg'
import LoaderImg from '../../../assets/images/loader.png'
import React, { FC } from 'react'
import styles from './styles.module.css'

export const Loader: FC = () => {
  return (
    <div className={styles.Loader}>
      <div className={styles.LoaderCircle}>
        <img src={LoaderImg} />
      </div>
      <div className={styles.LoaderBg}>
        <img src={LoaderBg} width="92" />
      </div>
    </div>
  )
}
