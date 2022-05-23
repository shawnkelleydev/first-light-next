import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { getPassageData } from 'services/esv'

import BibleReader from 'components/BibleReader'
import Loader from 'components/Loader'
import PageWrapper from 'components/PageWrapper'

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
  }, [router])

  useEffect(() => {
    if (query) {
      setLoading(true)
      ;(async () => {
        const data = await getPassageData(query)
        setPassageData(data)
        setLoading(false)
      })()
    }
  }, [query])

  if (query && loading)
    return (
      <PageWrapper>
        <Loader />
      </PageWrapper>
    )

  console.log(passageData)

  return (
    <PageWrapper>
      <div className={styles.bible}>
        <BibleQuery passageData={passageData} />
        {passageData?.passages.length > 0 && (
          <BibleReader passageData={passageData} />
        )}
      </div>
    </PageWrapper>
  )
}
