import { useEffect, useState } from 'react'
import { Interweave } from 'interweave'

import BibleQuery from 'components/BibleQuery'

import styles from './styles.module.css'

export default function BibleReader({ passageData }) {
  const [passage, setPassage] = useState(null)

  const { canonical, passage_meta, passages } = passageData

  useEffect(() => {
    const rawHtml = passages[0]
    if (rawHtml) {
      const supHtml = rawHtml
        .replaceAll('<b', '<sup')
        .replaceAll('</b>', '</sup>')
      setPassage(supHtml)
    }
  }, [passages])

  return (
    <div className={styles['bible-reader']}>
      <Interweave content={passage} />
    </div>
  )
}
