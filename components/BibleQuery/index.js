import { useState } from 'react'
import { useRouter } from 'next/router'

import { useEffect } from 'react'

import styles from './styles.module.css'

export default function BibleQuery({ passageData }) {
  const [query, setQuery] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()

  useEffect(() => {
    const { canonical } = passageData
    if (canonical.length < 1)
      setErrorMessage('Passage not found.  Please try again.')
  }, [passageData])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (query.length < 1) setErrorMessage('Please provide input.')
    if (query.length > 1) {
      setErrorMessage('')
      router.push(`/bible?q=${query.toLowerCase()}`)
    }
  }

  return (
    <form
      className={styles['bible-query']}
      onSubmit={(event) => handleSubmit(event)}
    >
      <fieldset data-error-message={errorMessage}>
        <legend>Go to a passage</legend>
        <div>
          <input
            onChange={(event) => setQuery(event.target.value)}
            type='text'
            value={query}
          />
          <button type='submit'>go</button>
        </div>
      </fieldset>
    </form>
  )
}
