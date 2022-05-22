import { useEffect, useState } from 'react'

import { getEarthPic } from 'services/nasa'
import { getRandomPassageData } from 'services/esv'

import DailyVerse from 'components/DailyVerse'
import EarthPic from 'components/EarthPic'
import Loader from 'components/Loader'
import PageWrapper from 'components/PageWrapper'

import styles from './styles.module.css'

export default function Home({ earthPic, randomPassageData }) {
  if (!randomPassageData || !earthPic)
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

export async function getStaticProps() {
  const earthPic = await getEarthPic()
  const randomPassageData = await getRandomPassageData()
  return {
    props: {
      earthPic,
      randomPassageData,
    },
  }
}
