import React, { FC } from 'react'
import styles from './styles.module.css'

type iProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string
}

export const InputText: FC<iProps> = ({ label, ...props }) => {
  return (
    <>
      {label && <p className={styles.InputLabel}>{label}</p>}
      <input type='text' className={styles.InputText} {...props} />
    </>
  )
}
