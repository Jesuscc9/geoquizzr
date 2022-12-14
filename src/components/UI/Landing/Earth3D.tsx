import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import React, { FC, useEffect, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { adjust } from '../../../helpers/utils'

const MODEL_URL = import.meta.env.VITE_ASSETS_URL + '/scene.gltf'

console.log({ MODEL_URL })

export const Earth3D = (): FC => {
  const gltf = useLoader(GLTFLoader, MODEL_URL)

  const [rotation, setRotation] = useState<number>(0)

  useEffect(() => {
    window.addEventListener('scroll', (e) => {
      const currentScroll = window.scrollY
      setRotation(adjust(currentScroll, 0, 1000, 0, Math.PI / 1.5))
    })

    // Initial rotation
    setRotation(adjust(window.scrollY, 0, 1000, 0, Math.PI / 1.5))
  }, [])

  return (
    <>
      <primitive object={gltf.scene} scale={0.01} rotation={[rotation, 0, 0]} />
    </>
  )
}
