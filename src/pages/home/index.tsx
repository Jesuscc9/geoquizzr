import { Button, Footer, Navbar } from 'components/UI'
import { NextPage } from 'next'
import Head from 'next/head'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import Link from 'next/link'
import React, { Suspense, useEffect, useState } from 'react'

import styles from './styles.module.css'
import { Canvas, useLoader } from '@react-three/fiber'
import { adjust } from 'helpers/utils'
import { OrbitControls } from '@react-three/drei'

const Model = () => {
  const gltf = useLoader(GLTFLoader, '/assets/earth2/scene.gltf')

  const [rotation, setRotation] = useState<number>(0)

  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      const currentScroll = window.scrollY
      setRotation(adjust(currentScroll, 0, 1000, 0, Math.PI / 1.5))
    })
  }, [])

  return (
    <>
      <primitive object={gltf.scene} scale={0.01} rotation={[rotation, 0, 0]} />
    </>
  )
}

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Geoquizzr</title>
      </Head>
      <div id="BackgroundDecoration" key="home"></div>
      <div className={styles.BackgroundCity}></div>

      <div className="flex flex-col gap-20">
        <Navbar />

        <div className={styles.MainContainer}>
          <div className={styles.Hero}>
            <div className={styles.Hero__text}>
              <h1 className="font-bold">
                DISCOVER YOUR OWN <br /> WORLD!
              </h1>
              <p>Learn information about countries all around the world</p>
              <Link href="/quizzes/new">
                <a className="w-min">
                  <Button
                    color="#f2c318"
                    className="text-sm py-4 whitespace-nowrap"
                  >
                    START LEARNING!
                  </Button>
                </a>
              </Link>
            </div>
            <div className={styles.Hero__image} id="earth-container">
              <div className={styles.globe + ' cursor-grabbing m-auto mt-20'}>
                <Canvas
                  shadows
                  dpr={[1, 2]}
                  camera={{ position: [0, 0, 4], fov: 30, rotateX: 20 }}
                >
                  <ambientLight intensity={0.7} />
                  <spotLight
                    intensity={0.5}
                    angle={0.1}
                    penumbra={1}
                    position={[10, 15, 10]}
                    castShadow
                  />
                  <Suspense fallback={null}>
                    <Model />
                    <OrbitControls
                      autoRotate
                      enableZoom={false}
                      autoRotateSpeed={0.5}
                    />
                  </Suspense>
                </Canvas>
              </div>

              {/* <Image src={EarthImage} /> */}
            </div>

            <div className="w-full py-20 mt-20 flex gap-5 justify-between">
              <div className="flex gap-3" style={{ width: 400 }}>
                <div
                  className="bg-white rounded-full"
                  style={{ minWidth: 50, height: 50 }}
                ></div>
                <div>
                  <p className="text-xl font-semibold">This is a feature</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>

              <div className="flex gap-3" style={{ width: 400 }}>
                <div
                  className="bg-white rounded-full"
                  style={{ minWidth: 50, height: 50 }}
                ></div>
                <div>
                  <p className="text-xl font-semibold">This is a feature</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>

              <div className="flex gap-3" style={{ width: 400 }}>
                <div
                  className="bg-white rounded-full"
                  style={{ minWidth: 50, height: 50 }}
                ></div>
                <div>
                  <p className="text-xl font-semibold">This is a feature</p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

export default Home
