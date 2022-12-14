import { Button, Footer, Navbar, Earth3D } from '../../components/UI'
import React, { FC, Suspense } from 'react'
import styles from './styles.module.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Link } from 'react-router-dom'

const Home: FC = () => {
  return (
    <>
      <div id="BackgroundDecoration" key="home"></div>
      {/* <div className={styles.BackgroundCity}></div> */}

      <div className="flex flex-col gap-20">
        <Navbar />

        <div className={styles.MainContainer}>
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-6xl text-white">
              DISCOVER YOUR OWN <br /> WORLD!
            </h1>
            <p className="text-lg text-white">
              Learn information about countries all around the world
            </p>
            <Link to="/quizzes/new" className="w-min">
              <Button
                color="#ddb00f"
                className="text-sm py-4 whitespace-nowrap"
              >
                <p className="text-white">START LEARNING!</p>
              </Button>
            </Link>
          </div>
          <div>
            <div className={styles.globe + ' cursor-grabbing m-auto mt-20'}>
              <Suspense fallback={<p className="text-white">Loading...</p>}>
                <Canvas
                  shadows
                  dpr={[1, 2]}
                  camera={{ position: [0, 0, 4], fov: 30 }}
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
                    <Earth3D />
                    <OrbitControls
                      autoRotate
                      enableZoom={false}
                      autoRotateSpeed={0.6}
                    />
                  </Suspense>
                </Canvas>
              </Suspense>
            </div>
          </div>

          <div className="w-full py-20 mt-20 flex gap-5 justify-between">
            <div className="flex gap-3" style={{ width: 400 }}>
              <div
                className="bg-white rounded-full"
                style={{ minWidth: 50, height: 50 }}
              ></div>
              <div>
                <p className="text-xl font-semibold">This is a feature</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>

            <div className="flex gap-3" style={{ width: 400 }}>
              <div
                className="bg-white rounded-full"
                style={{ minWidth: 50, height: 50 }}
              ></div>
              <div>
                <p className="text-xl font-semibold">This is a feature</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </div>

            <div className="flex gap-3" style={{ width: 400 }}>
              <div
                className="bg-white rounded-full"
                style={{ minWidth: 50, height: 50 }}
              ></div>
              <div>
                <p className="text-xl font-semibold">This is a feature</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
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
