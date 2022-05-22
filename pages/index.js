import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { getEarthPic } from 'services/nasa'
import { getPassageData } from 'services/esv'

import { getRandomVerse } from 'utils/esv'

import DailyVerse from 'components/DailyVerse'
import EarthPic from 'components/EarthPic'
import Loader from 'components/Loader'
import PageWrapper from 'components/PageWrapper'

import styles from './styles.module.css'

export default function Home({ earthPic }) {
  const [randomPassageData, setRandomPassageData] = useState(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const verse = getRandomVerse()

    let path = router.asPath

    if (!path.includes('/?q=')) router.push(`/?q=${verse}`)
  }, [router])

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const query = router.query.q
      if (!query) return

      const data = await getPassageData(query)

      setRandomPassageData(data)
      setLoading(false)
    })()
  }, [router])

  if (loading || !earthPic)
    return (
      <PageWrapper>
        <Loader />
      </PageWrapper>
    )

  return (
    <PageWrapper>
      <div className={styles.home}>
        <div>
          <EarthPic earthPic={earthPic} />
          <DailyVerse passageData={randomPassageData} />
        </div>
      </div>
    </PageWrapper>
  )
}

export const getStaticProps = async () => {
  const earthPic = await getEarthPic()
  return {
    props: {
      earthPic,
    },
  }
}
