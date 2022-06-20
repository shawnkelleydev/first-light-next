import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { getQuery, hasQuery } from 'utils/nasa'

import SpacePic from 'components/SpacePic'

import styles from './styles.module.css'

export default function Space() {
  const router = useRouter()

  useEffect(() => {
    !hasQuery(router.asPath) && router.push(`/space?q=${getQuery()}`)
  }, [router])

  return (
    <div className={styles.space}>
      <SpacePic />
    </div>
  )
}
