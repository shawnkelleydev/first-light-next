import { verifyContent } from 'utils/esv'

import BibleReader from 'components/BibleReader'
import BibleQuery from 'components/BibleQuery'
import Loader from 'components/Loader'

import useBibleData from 'usePageData/useBibleData'

import styles from './styles.module.css'

export default function Bible() {
  const [passageData, query] = useBibleData()

  if (!passageData && query) return <Loader />
  const showPassage = verifyContent(passageData?.passages[0])

  return (
    <div
      className={styles.bible}
      data-show-passage={showPassage}
    >
      <BibleQuery passageData={passageData} />
      {showPassage && <BibleReader passageData={passageData} />}
    </div>
  )
}
