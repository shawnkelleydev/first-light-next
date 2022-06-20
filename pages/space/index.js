import { useEffect } from 'react'
import { useRouter } from 'next/router'

import SpacePic from 'components/SpacePic'

import { getRandomIndex } from 'utils/math'
import { queries } from 'utils/constants/nasa'

import styles from './styles.module.css'

export default function Space() {
  const router = useRouter()

  useEffect(() => {
    const routeHasQuery = router.asPath.includes('?q=')

    const randomQuery = queries[getRandomIndex(queries.length)]

    if (!routeHasQuery) router.push(`/space?q=${randomQuery}`)
  }, [router])

  return (
    <div className={styles.space}>
      <SpacePic />
    </div>
  )
}
