import PageWrapper from 'components/PageWrapper'
import SpacePic from 'components/SpacePic'

import styles from './styles.module.css'

export default function Space() {
  return (
    <PageWrapper>
      <div className={styles.space}>
        <SpacePic />
      </div>
    </PageWrapper>
  )
}
