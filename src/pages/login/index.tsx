import { LoginForm } from 'components/forms'
import { Navbar } from 'components/UI'
import Head from 'next/head'
import React, { FC } from 'react'

const Login: FC = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div id='BackgroundDecoration' key='login'></div>
      <Navbar />
      <LoginForm />
    </>
  )
}

export default Login
