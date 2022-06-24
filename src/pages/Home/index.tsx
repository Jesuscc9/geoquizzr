import EarthImage from '@/images/earth3.png'
import { Button, Navbar } from 'components/UI'
import React, { FC } from 'react'
import styles from './styles.module.css'
import { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <>
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

              <Button color='#FECD19' className={styles.Hero__button}>
                START LEARNING!
              </Button>
  
          </div>
          {/* <img src={EarthImage} className={styles.Hero__image} /> */}
        </div>
      </div>
    </>
  )
}

export default Home
