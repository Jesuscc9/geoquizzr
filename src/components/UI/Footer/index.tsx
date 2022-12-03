import { useAuth, useUser } from 'hooks'
import React, { FC } from 'react'

export const Footer: FC = () => {
  const { logout } = useAuth()
  const { user } = useUser()

  return (
    <footer style={{ height: 200 }} className="bg-black">
      {user && <button onClick={logout}>logout</button>}
    </footer>
  )
}
