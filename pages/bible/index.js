import BibleReader from 'components/BibleReader'
import BibleQuery from 'components/BibleQuery'
import Loader from 'components/Loader'

import useBibleData from 'useData/useBibleData'

import styles from './styles.module.css'

export default function Bible() {
  const [passageData, query] = useBibleData()

  if (!passageData && query) return <Loader />

  return (
    <div
      className={styles.bible}
      data-passage={!!passageData}
    >
      <BibleQuery passageData={passageData} />
      {passageData?.passages.length > 0 && (
        <BibleReader passageData={passageData} />
      )}
    </div>
  )
}
