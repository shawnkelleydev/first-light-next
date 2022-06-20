import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { queries } from 'utils/constants/nasa'
import { getRandomIndex } from 'utils/math'
import { isQuery } from 'utils/nasa'

import SpacePic from 'components/SpacePic'

import styles from './styles.module.css'

export default function Space() {
  const router = useRouter()

  useEffect(() => {
    const query = queries[getRandomIndex(queries.length)]

    !isQuery(router.asPath) && router.push(`/space?q=${query}`)
  }, [router])

  return (
    <div className={styles.space}>
      <SpacePic />
    </div>
  )
}
