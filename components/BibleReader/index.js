import { useEffect, useState } from 'react'
import { Interweave } from 'interweave'

import BibleNav from 'components/BibleNav'

import styles from './styles.module.css'

export default function BibleReader({ passageData }) {
  const [passage, setPassage] = useState(null)

  const { passages, passage_meta } = passageData

  useEffect(() => {
    const rawHtml = passages[0]
    if (rawHtml) {
      const supHtml = rawHtml
        .replaceAll('<b', '<sup')
        .replaceAll('</b>', '</sup>')
      const htmlSansNbsp = supHtml.replaceAll('&nbsp;', '')
      setPassage(htmlSansNbsp)
    }
  }, [passages])

  const metadata = passage_meta[0]

  return (
    <div className={styles['bible-reader']}>
      <BibleNav metadata={metadata} />
      <Interweave content={passage} />
      <BibleNav metadata={metadata} />
    </div>
  )
}
