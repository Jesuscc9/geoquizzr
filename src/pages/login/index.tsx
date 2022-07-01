import { LoginForm } from 'components/forms'
import { Navbar } from 'components/UI'
import React, { FC } from 'react'

const Login: FC = () => {
  return (
    <>
      <div id='BackgroundDecoration' key='login'></div>
      <Navbar />
      <LoginForm />
    </>
  )
}

export default Login
