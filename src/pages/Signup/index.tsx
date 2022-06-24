import { SignupForm } from 'components/forms'
import { Navbar } from 'components/UI'
import React, { FC } from 'react'
import { SignupStyles } from './Signup.style'

export const Signup: FC = () => {
  return (
    <>
      <div id='BackgroundDecoration' key='home'></div>
      <Navbar />
      <SignupStyles />
      <SignupForm />
    </>
  )
}
