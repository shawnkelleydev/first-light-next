import { useEffect, useState } from 'react'
import { Interweave } from 'interweave'

import Link from 'components/Link'

import styles from './styles.module.css'

export default function DailyVerse({ passageData }) {
  const [passage, setPassage] = useState(null)
  const [citation, setCitation] = useState(null)

  useEffect(() => {
    if (passageData) {
      let html = passageData.passages[0]
      html = html.replaceAll('<b', '<sup').replaceAll('</b>', '</sup>')

      setPassage(html)
      const truncatedCitation = passageData.canonical.split(':')[0]
      setCitation(truncatedCitation)
    }
  }, [passageData])

  return (
    <div className={styles['daily-verse']}>
      <div>
        <Link url='/'>get another verse</Link>
      </div>
      <blockquote>
        <Interweave content={passage} />
      </blockquote>
      <div>
        <Link url={`/bible?q=${citation}`}>
          <span>read </span>
          <cite>{citation}</cite>
        </Link>
      </div>
    </div>
  )
}
