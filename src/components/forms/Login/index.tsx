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

export const LoginForm: FC = () => {
  const { login, error: loginError, isLoading, loginWithGoogle } = useAuth()

  const { handleChange, handleSubmit } = useFormik<iLoginValues>({
    initialValues,
    onSubmit: async (values) => {
      login(values)
    }
  })

  return (
    <form onSubmit={handleSubmit} className={styles.Form}>
      <h2>Log In</h2>
      <br />
      {loginError && !isLoading && (
        <FormNotice variant='error' message={loginError} />
      )}
      <br />
      <motion.div layout>
        <InputText
          name='email'
          placeholder='email@example.com'
          label='Email'
          onChange={handleChange}
        />
        <br />
        <br />
        <InputText
          name='password'
          label='Password'
          placeholder='******'
          type='password'
          onChange={handleChange}
        />
      </motion.div>
      <Button loading={isLoading}>LOG IN</Button>

      <motion.div className={styles.GoogleLogin} layout>
        <div className={styles.GoogleLogin__separator}>
          <div></div>
          <p>Or login with</p>
          <div></div>
        </div>
        <Button
          variant='outline'
          loading={isLoading}
          type='button'
          onClick={loginWithGoogle}
        >
          GOOGLE
        </Button>
      </motion.div>
    </form>
  )
}
