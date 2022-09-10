import PersonIcon from '@/images/person.png'
import { ClueWrapper } from 'components/UI'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import useSWR from 'swr'
import { iClue } from 'types'
import styles from './styles.module.css'

interface iProps {
  data: iClue
  decrement: (n: number) => void
}

export const ContinentClue: FC<iProps> = ({ data, decrement }) => {
  const [revealClue, setRevealClue] = useState<boolean>(false)

  const router = useRouter()

  const {
    query: { uuid }
  } = router

  const { data: quizz } = useSWR(`/api/quizzes/${uuid}`)

  if (!quizz) return <div>cargando</div>

  const currentRound = quizz.rounds.at(-1)

  const {
    continents: [continent]
  } = currentRound.country

  const handleClueClick = () => {
    if (revealClue === true) return
    setRevealClue(true)
    decrement(data.cost)
  }

  return (
    <>
      <div className={styles.ContinentClue} onClick={handleClueClick}>
        {revealClue ? (
          <p>The continent is {continent}</p>
        ) : (
          <>
            <h3>SHOW CONTINENT</h3>
            <p>-({data.cost} seconds)</p>
          </>
        )}
      </div>

      {revealClue && (
        <ClueWrapper>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              gap: '2rem'
            }}
          >
            {[1, 2, 3, 4, 5].map((e, i) => {
              return (
                <motion.div
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 1, scale: 1.2 }}
                  transition={{
                    delay: 0.25 * e,
                    type: 'spring',
                    bounce: 0.4
                  }}
                  key={i}
                >
                  <Image src={PersonIcon} width="30" height="40" />
                </motion.div>
              )
            })}
          </div>
          <h2 style={{ color: 'black', textAlign: 'center' }}>{continent}</h2>
        </ClueWrapper>
      )}
    </>
  )
}
