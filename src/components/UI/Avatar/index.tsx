import React, { FC } from 'react'
import styles from './styles.module.css'

const DEFAULT_AVATAR =
  'https://t3.ftcdn.net/jpg/03/39/45/96/360_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg'

export const Avatar: FC<{ size?: number; src: string | null }> = ({
  size = 40,
  src
}) => {
  return (
    <img
      src={src ?? DEFAULT_AVATAR}
      width={size}
      height={size}
      className={styles.Avatar}
      referrerPolicy="no-referrer"
    />
  )
}
