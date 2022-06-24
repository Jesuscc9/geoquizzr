import { useAuth, useUser } from 'hooks'
import React, { FC } from 'react'
import styles from './styles.module.css'

export const Footer: FC = () => {
  const { user } = useUser()
  const { logout } = useAuth()

  return (
    <footer className={styles.Footer}>
      {user && <button onClick={logout}>logout</button>}
    </footer>
  )
}
