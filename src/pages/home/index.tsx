import EarthImage from '@/images/earth3.png'
import { Button, Footer, Navbar } from 'components/UI'
import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './styles.module.css'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div id='BackgroundDecoration' key='home'></div>
      <div className={styles.BackgroundCity}></div>
      <Navbar />

      <div className={styles.MainContainer}>
        <div className={styles.Hero}>
          <div className={styles.Hero__text}>
            <h1>
              DISCOVER YOUR OWN <br /> WORLD!
            </h1>
            <p>Learn information about countries all around the world</p>
            <Link href='/quizzes/new'>
              <a>
                <Button color='#FECD19' className={styles.Hero__button}>
                  START LEARNING!
                </Button>
              </a>
            </Link>
          </div>
          <div className={styles.Hero__image}>
            <Image src={EarthImage} />
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Home
