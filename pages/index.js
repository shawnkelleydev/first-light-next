import DailyVerse from 'components/DailyVerse'
import EarthPic from 'components/EarthPic'
import PageWrapper from 'components/PageWrapper'

import styles from './styles.module.css'

export default function Home() {
  return (
    <PageWrapper>
      <div className={styles.home}>
        <EarthPic />
        <DailyVerse />
      </div>
    </PageWrapper>
  )
}
