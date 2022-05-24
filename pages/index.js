import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { getEarthPicData } from 'services/nasa'
import { getPassageData } from 'services/esv'

import { getRandomVerse } from 'utils/esv'

import DailyVerse from 'components/DailyVerse'
import EarthPic from 'components/EarthPic'
import Loader from 'components/Loader'

import styles from './styles.module.css'

export default function Home({ earthPicData }) {
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

      const passageData = await getPassageData(query)

      setRandomPassageData(passageData)
      setLoading(false)
    })()
  }, [router])

  if (loading) return <Loader />

  return (
    <div className={styles.home}>
      <div>
        <EarthPic earthPicData={earthPicData} />
        <DailyVerse passageData={randomPassageData} />
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const earthPicData = await getEarthPicData()
  return {
    props: {
      earthPicData,
    },
    revalidate: 3600,
  }
}
