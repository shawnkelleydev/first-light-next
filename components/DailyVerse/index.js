import { useEffect, useState } from 'react'

import { Interweave } from 'interweave'

import styles from './styles.module.css'

export default function DailyVerse({ passageData }) {
  const [passage, setPassage] = useState(null)
  const [citation, setCitation] = useState(null)

  useEffect(() => {
    if (passageData) {
      let html = passageData.passages[0]
      html = html.replace('<b', '<sup').replace('</b>', '</sup>')
      setPassage(html)
      setCitation(passageData.canonical)
    }
  }, [passageData])

  return (
    <div className={styles['daily-verse']}>
      <blockquote>
        <Interweave content={passage} />
      </blockquote>
      <cite>{citation}</cite>
    </div>
  )
}
