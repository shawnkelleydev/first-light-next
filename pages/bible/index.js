import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { getApod } from 'services/nasa'

import PageWrapper from 'components/PageWrapper'

import styles from './styles.module.css'

export default function Bible() {
  const [apod, setApod] = useState(null)

  useEffect(() => {
    if (apod) return
    ;(async () => {
      const apodData = await getApod()
      setApod(apodData)
    })()
  }, [apod])

  console.log('apod', apod)

  if (!apod) return

  return (
    <PageWrapper>
      <div className={styles.bible}>
        <Image
          height='2160'
          layout='fill'
          objectFit='cover'
          objectPosition='left'
          width='3840'
          src='/jupiter.jpeg'
        />
        <h2>BIBLE</h2>
      </div>
    </PageWrapper>
  )
}
