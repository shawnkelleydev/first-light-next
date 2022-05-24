import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { getNasaImage } from 'services/nasa'

import styles from './styles.module.css'
import Loader from 'components/Loader'

export default function SpacePic() {
  const [query, setQuery] = useState(null)

  const [imageData, setImageData] = useState(null)

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const { q } = router.query
    if (q) setQuery(q)
  }, [router])

  useEffect(() => {
    setError(false)
    setLoading(true)
    ;(async () => {
      if (query) {
        let data
        let index = 0
        while (!data) {
          if (index > 9) {
            setError(true)
            break
          }
          data = await getNasaImage(query)
          index++
        }

        if (data) {
          setImageData(data)
          setError(false)
        }

        setLoading(false)
      }
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
      {error && (
        <div>
          <h3>Error</h3>
          <p>please try again</p>
        </div>
      )}
    </div>
  )
}
