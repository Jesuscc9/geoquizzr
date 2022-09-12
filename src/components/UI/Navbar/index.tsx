import Logo from '@/images/logo.svg'
import MobileLogo from '@/images/mobile_logo.svg'
import { Avatar, Button } from 'components/UI'
import { useUser } from 'hooks'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'
import styles from './styles.module.css'

export const Navbar: FC = () => {
  const { user } = useUser()

  return (
    <nav className={`${styles.Navbar} p-5`}>
      <Link href="/">
        <a>
          <Image
            src={Logo}
            width="132"
            className={styles.Navbar__logo}
            alt=""
          />
          <Image
            src={MobileLogo}
            width="28"
            className={styles['Navbar__mobile-logo']}
            alt=""
          />
        </a>
      </Link>
      <h4 className="font-bold">geoquizzr</h4>
      {user ? (
        <div className={styles['Navbar__user-data']}>
          <Avatar src={user.picture} />
          <h5 className="font-semibold">{user.name}</h5>
        </div>
      ) : (
        <div className={styles['Navbar__auth-buttons']}>
          <Link href="/signup">
            <a>
              <Button className="text-sm">signup</Button>
            </a>
          </Link>

          <Link href="/login">
            <a>
              <Button variant="outline" className="text-sm">
                login
              </Button>
            </a>
          </Link>
        </div>
      )}
    </nav>
  )
}
