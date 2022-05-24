import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { getPassageData } from 'services/esv'

import BibleReader from 'components/BibleReader'
import Loader from 'components/Loader'

import styles from './styles.module.css'
import BibleQuery from 'components/BibleQuery'

export default function Bible() {
  const [query, setQuery] = useState(null)
  const [passageData, setPassageData] = useState(null)

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const query = router.query.q
    if (query) setQuery(query)
    if (!query) {
      setQuery(null)
      setPassageData(null)
    }
  }, [router])

  useEffect(() => {
    if (query) {
      setLoading(true)
      ;(async () => {
        const data = await getPassageData(query)
        setPassageData(data)
        setLoading(false)
      })()
    } else {
      setPassageData(null)
    }
  }, [query])

  if (query && loading) return <Loader />

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
