// import PersonIcon from '@/images/person.png'
import { ClueWrapper } from 'components/UI'
import { motion } from 'framer-motion'
import { maskNumber } from 'helpers/utils'
import React, { FC, useState } from 'react'
import useSWR from 'swr'
import { iClue } from 'types'
import styles from './styles.module.css'

interface iProps {
  data: iClue
  decrement: (n: number) => void
}

export const PopulationClue: FC<iProps> = ({ data, decrement }) => {
  const [revealClue, setRevealClue] = useState<boolean>(false)

  const uuid = ''

  const { data: countryData, error } = useSWR(`api/quizzes/${uuid}`)

  if (!countryData) return <div>cargando</div>

  const handleClueClick = () => {
    if (revealClue === true) return
    setRevealClue(true)
    decrement(data.cost)
  }

  return (
    <>
      <div className={styles.PopulationClue} onClick={handleClueClick}>
        {revealClue ? (
          <p>The population is {maskNumber(countryData.population)}</p>
        ) : (
          <>
            <h3>SHOW POPULATION</h3>
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
                <motion.img
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 1, scale: 1.2 }}
                  transition={{
                    delay: 0.25 * e,
                    type: 'spring',
                    bounce: 0.4
                  }}
                  // src={PersonIcon}
                  key={i}
                  width='30'
                  height='40'
                  alt=''
                />
              )
            })}
          </div>
          <h2 style={{ color: 'black', textAlign: 'center' }}>
            {/* {maskNumber(population)} */}
          </h2>
        </ClueWrapper>
      )}
    </>
  )
}
