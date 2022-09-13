import PersonIcon from '@/images/person.png'
import { ClueWrapper } from 'components/UI'
import { motion } from 'framer-motion'
import Image from 'next/image'
import router from 'next/router'
import React, { FC, useState } from 'react'
import useSWR from 'swr'
import { iClue } from 'types'

interface iProps {
  data: iClue
  decrement: (n: number) => void
}

export const CapitalClue: FC<iProps> = ({ data, decrement }) => {
  const [revealClue, setRevealClue] = useState<boolean>(false)

  const {
    query: { uuid }
  } = router

  const { data: quizz } = useSWR(`/api/quizzes/${uuid}`)

  if (!quizz) return <div>cargando</div>

  const currentRound = quizz.rounds.at(-1)

  const { capital } = currentRound.country

  const handleClueClick = () => {
    if (revealClue === true) return
    setRevealClue(true)
    decrement(data.cost)
  }

  return (
    <>
      <motion.div
        className="bg-purple p-4 cursor-pointer select-none border-4 rounded-lg border-yellow-600"
        onClick={handleClueClick}
        initial={{ x: -40 }}
        whileHover={{ x: -26 }}
      >
        <motion.div className="ml-10">
          {revealClue ? (
            <p>The capital is {capital}</p>
          ) : (
            <>
              <h3 className="text-sm font-semibold">SHOW CAPITAL</h3>
              <p className="mt-2 font-semibold opacity-60">
                -({data.cost} seconds)
              </p>
            </>
          )}
        </motion.div>
      </motion.div>

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
          <h2 style={{ color: 'black', textAlign: 'center' }}>{capital}</h2>
        </ClueWrapper>
      )}
    </>
  )
}
