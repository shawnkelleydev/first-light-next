import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { getEarthPicData } from 'services/nasa'
import { getPassageData } from 'services/esv'

import { getRandomVerse } from 'utils/esv'

import DailyVerse from 'components/DailyVerse'
import EarthPic from 'components/EarthPic'
import Loader from 'components/Loader'
import PageWrapper from 'components/PageWrapper'

import styles from './styles.module.css'

export default function Home() {
  const [earthPicData, setEarthPicData] = useState(null)
  const [randomPassageData, setRandomPassageData] = useState(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const verse = getRandomVerse()
    const path = router.asPath

    if (!path.includes('/?q=')) router.push(`/?q=${verse}`)
  }, [router])

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const query = router.query.q
      if (!query) return

      const picData = await getEarthPicData()
      const passageData = await getPassageData(query)

      setEarthPicData(picData)
      setRandomPassageData(passageData)
      setLoading(false)
    })()
  }, [router])

  if (loading)
    return (
      <PageWrapper>
        <Loader />
      </PageWrapper>
    )

  return (
    <PageWrapper>
      <div className={styles.home}>
        <div>
          <EarthPic earthPicData={earthPicData} />
          <DailyVerse passageData={randomPassageData} />
        </div>
      </div>
    </PageWrapper>
  )
}
