import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import React, { useEffect, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { adjust } from 'helpers/utils'

export const Earth3D = () => {
  const gltf = useLoader(GLTFLoader, '/assets/earth2/scene.gltf')

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
