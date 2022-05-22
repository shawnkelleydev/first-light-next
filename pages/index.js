import { useEffect, useState } from 'react'

import { getEarthPic } from 'services/nasa'
import { getRandomPassageData } from 'services/esv'

import DailyVerse from 'components/DailyVerse'
import EarthPic from 'components/EarthPic'
import Loader from 'components/Loader'
import PageWrapper from 'components/PageWrapper'

import styles from './styles.module.css'

export default function Home() {
  const [earthPic, setEarthPic] = useState(null)
  const [randomPassageData, setRandomPassageData] = useState(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const pic = await getEarthPic()
      const data = await getRandomPassageData()

      setEarthPic(pic)
      setRandomPassageData(data)

      setLoading(false)
    })()
  }, [])

  if (loading)
    return (
      <PageWrapper>
        <Loader />
      </PageWrapper>
    )

  return (
    <PageWrapper>
      <div className={styles.home}>
        <EarthPic earthPic={earthPic} />
        <DailyVerse passageData={randomPassageData} />
      </div>
    </PageWrapper>
  )
}
