import { SignupForm } from 'components/forms'
import { Navbar } from 'components/UI'
import React, { FC } from 'react'

const Signup: FC = () => {
  return (
    <>
      <div id="BackgroundDecoration" key="home"></div>
      <Navbar />
      <SignupForm />
    </>
  )
}

export default Signup
