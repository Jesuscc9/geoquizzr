import Logo from 'assets/logo.svg'
import MobileLogo from 'assets/mobile_logo.svg'
import { Avatar, Button } from 'components/UI'
import { useUser } from 'hooks'
import React, { FC } from 'react'
import styles from './styles.module.css'

export const Navbar: FC = () => {
  const { user } = useUser()

  return (
    <nav className={styles.Navbar}>
      {/* <Link to='/'>
        <img src={Logo} width='132' className={styles.Navbar__logo} />
        <img
          src={MobileLogo}
          width='28'
          className={styles['Navbar__mobile-logo']}
        />
      </Link> */}
      <h4>geoquizzr</h4>
      {user ? (
        <div className={styles['Navbar__user-data']}>
          <Avatar src={user.avatar_url} />
          <h5>{user.name}</h5>
        </div>
      ) : (
        <div className={styles['Navbar__auth-buttons']}>
          {/* <Link to='/signup'>
            <Button>signup</Button>
          </Link>
          <Link to='/login'>
            <Button variant='outline'>login</Button>
          </Link> */}
        </div>
      )}
    </nav>
  )
}
