import { LoginForm } from 'components/forms'
import { Navbar } from 'components/UI'
import React, { FC } from 'react'
import { LoginStyles } from './Login.style'

export const Login: FC = () => {
  return (
    <>
      <div id='BackgroundDecoration' key='login'></div>
      <LoginStyles />
      <Navbar />
      <LoginForm />
    </>
  )
}
