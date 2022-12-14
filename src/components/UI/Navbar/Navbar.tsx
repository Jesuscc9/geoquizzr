import Logo from '../../../assets/images/logo.svg'
import MobileLogo from '../../../assets/images/mobile_logo.svg'
import { Avatar, Button } from '..'
import React, { FC } from 'react'
import styles from './styles.module.css'
import { useProfile } from '../../../hooks/useProfile'

export const Navbar: FC = () => {
  const { profile } = useProfile()

  return (
    <nav className="px-8 py-8 flex justify-between items-center text-white">
      <a>
        <div>
          <img title="Logo" src={Logo} width="132" />
        </div>
      </a>
      <div>
        <p className="font-bold uppercase">geoquizzr</p>
      </div>
      {profile != null ? (
        <div className={styles['Navbar__user-data']}>
          <Avatar src={profile.avatar_url} />
          <h5 className="font-semibold">{profile.username}</h5>
        </div>
      ) : (
        <div className={styles['Navbar__auth-buttons']}>
          <a href="signup">
            <Button className="text-sm">
              <p className="text-white">Signup</p>
            </Button>
          </a>

          <a href="login">
            <Button variant="outline" className="text-sm">
              login
            </Button>
          </a>
        </div>
      )}
    </nav>
  )
}
