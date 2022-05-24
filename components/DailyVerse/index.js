import { useEffect, useState } from 'react'
import { Interweave } from 'interweave'

import Link from 'components/Link'

import { processPassageHtml, truncateCitation } from 'utils/esv'

import styles from './styles.module.css'

export default function DailyVerse({ passageData }) {
  const [passage, setPassage] = useState(null)
  const [citation, setCitation] = useState(null)

  useEffect(() => {
    if (passageData) {
      const rawPassageHtml = passageData.passages[0]
      const processedPassageHtml = processPassageHtml(rawPassageHtml)
      setPassage(processedPassageHtml)

      const citation = truncateCitation(passageData.canonical)
      setCitation(citation)
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
