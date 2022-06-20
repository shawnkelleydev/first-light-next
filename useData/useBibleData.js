import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { getPassageData } from 'services/esv'

export default function useBibleData() {
  const [query, setQuery] = useState(null)
  const [passageData, setPassageData] = useState(null)

  const router = useRouter()

  useEffect(() => {
    const query = router.query.q
    if (query) {
      setQuery(query)
      setPassageData(null)
    } else {
      setQuery(null)
      setPassageData(null)
    }
  }, [router])

  useEffect(() => {
    if (query) getPassageData(query).then(data => setPassageData(data))
    else setPassageData(null)
  }, [query])

  return [passageData, query]
}
