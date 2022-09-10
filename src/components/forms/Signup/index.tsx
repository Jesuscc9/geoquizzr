import { Button, FormNotice, InputText } from 'components/UI'
import { useFormik } from 'formik'
import { motion } from 'framer-motion'
import { useAuth } from 'hooks'
import React, { FC } from 'react'
import styles from './styles.module.css'

interface iLoginValues {
  email: string
  password: string
}

const initialValues: iLoginValues = {
  email: '',
  password: ''
}

export const SignupForm: FC = () => {
  const { signUp, error: signupError, isLoading, loginWithGoogle } = useAuth()

  const { handleChange, handleSubmit } = useFormik<iLoginValues>({
    initialValues,
    onSubmit: async (values) => {
      signUp(values)
    }
  })

  return (
    <form onSubmit={handleSubmit} className={styles.Form}>
      <h2>Create Account</h2>
      <br />
      {signupError && !isLoading && (
        <FormNotice variant="error" message={signupError} />
      )}
      <br />
      <motion.div layout>
        <InputText
          name="email"
          placeholder="email@example.com"
          label="Email"
          onChange={handleChange}
        />
        <br />
        <br />
        <InputText
          name="password"
          label="Password"
          type="password"
          placeholder="******"
          onChange={handleChange}
        />
      </motion.div>
      <Button loading={isLoading}>sign up</Button>

      <motion.div className={styles.GoogleLogin} layout>
        <div className={styles.GoogleLogin__separator}>
          <div></div>
          <p>Or Sign Up with</p>
          <div></div>
        </div>
        <Button variant="outline" type="button" onClick={loginWithGoogle}>
          GOOGLE
        </Button>
      </motion.div>
    </form>
  )
}
