import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { getPassageData } from 'services/esv'

import PageWrapper from 'components/PageWrapper'

import styles from './styles.module.css'
import Loader from 'components/Loader'
import { Interweave } from 'interweave'
import BibleReader from 'components/BibleReader'
import BibleQuery from 'components/BibleQuery'
// import Loader from 'components/Loader'

export default function Bible() {
  const [query, setQuery] = useState(null)
  const [passageData, setPassageData] = useState(null)

  const router = useRouter()

  useEffect(() => {
    const query = router.query.q
    if (query) setQuery(query)
  }, [router])

  useEffect(() => {
    if (query) {
      ;(async () => {
        const data = await getPassageData(query)
        setPassageData(data)
      })()
    }
  }, [query])

  if (query && !passageData)
    return (
      <PageWrapper>
        <Loader />
      </PageWrapper>
    )

  return (
    <PageWrapper>
      <div className={styles.bible}>
        <BibleQuery />
        {query && <BibleReader />}
      </div>
    </PageWrapper>
  )
}
