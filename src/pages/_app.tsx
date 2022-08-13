import axios, { AxiosRequestConfig } from 'axios'
import { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { supabase } from 'services'
import { SWRConfig } from 'swr'
import '../global.css'

export const fetcher = async (
  url: string,
  method = 'GET',
  data?: { [key: string]: any }
) => {
  const token = supabase.auth.session()?.access_token

  const options: AxiosRequestConfig<any> = {
    headers: {
      'Content-Type': 'application/json',
      token: token ?? ''
    },
    withCredentials: true
  }

  options.method = method

  if (data) options.data = JSON.stringify(data)

  return axios(url, options).then((res) => {
    if (res.statusText !== 'OK') {
      console.error('handle global error', res.statusText)
    }
    return res.data
  })
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Geoquizzr</title>
        <meta
          name='description'
          content='Gequizzr. The unique online platform to improve your knowledge about geography'
        />
        <link rel='icon' href='/assets/images/favicon.svg' />
      </Head>

      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
    </>
  )
}
