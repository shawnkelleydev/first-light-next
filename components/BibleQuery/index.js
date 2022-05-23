import { useState } from 'react'
import { useRouter } from 'next/router'

import styles from './styles.module.css'

export default function BibleQuery() {
  const [query, setQuery] = useState('')

  const router = useRouter()

  const handleSubmit = (event) => {
    event.preventDefault()
    router.push(`/bible?q=${query}`)
  }

  return (
    <div className={styles['bible-query']}>
      <h3>Go to a Passage</h3>
      <form onSubmit={(event) => handleSubmit(event)}>
        <input
          onChange={(event) => setQuery(event.target.value)}
          type='text'
          value={query}
        />
        <button type='submit'>go</button>
      </form>
    </div>
  )
}
