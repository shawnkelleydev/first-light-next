import { useEffect, useState } from 'react'
import Image from 'next/image'

import { queryNasa, getNasaImage } from 'services/nasa'

import styles from './styles.module.css'
import Loader from 'components/Loader'

export default function SpacePic({ query }) {
  const [imageData, setImageData] = useState(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const data = await getNasaImage('juno')
      setImageData(data)
      setLoading(false)
    })()
  }, [query])

  if (loading) return <Loader />

  return (
    <div className={styles['space-pic']}>
      {imageData && (
        <Image
          alt={imageData.title}
          layout='intrinsic'
          height={imageData.size.height}
          priority
          src={imageData.imageUrl}
          width={imageData.size.width}
        />
      )}
    </div>
  )
}
