import { useEffect } from 'react'
import { useRouter } from 'next/router'

import SpacePic from 'components/SpacePic'

import { getRandomNumber } from 'utils/math'
import { nasaQueries } from 'constants/data'

import styles from './styles.module.css'

export default function Space() {
  const router = useRouter()

  useEffect(() => {
    const routeHasQuery = router.asPath.includes('?q=')

    const randomQuery = nasaQueries[getRandomNumber(nasaQueries.length)]

    if (!routeHasQuery) router.push(`/space?q=${randomQuery}`)
  }, [router])

  return (
    <div className={styles.space}>
      <SpacePic />
    </div>
  )
}
