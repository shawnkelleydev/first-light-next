import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { getNasaImage } from 'services/nasa'

import styles from './styles.module.css'
import Loader from 'components/Loader'
import SpacePicModal from 'components/SpacePicModal'

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
    query &&
      (async () => {
        let data
        let index = 0
        while (!data) {
          switch (index) {
            case index > 9:
              setError(true)
              break
            default:
              data = await getNasaImage(query)
              index++
          }
        }

        if (data) {
          setImageData(data)
          setError(false)
        }

        setLoading(false)
      })()
  }, [query])

  if (loading) return <Loader />

  return (
    <div className={styles['space-pic']}>
      {imageData && (
        <>
          <Image
            alt={imageData.title}
            blurDataURL={imageData.placeholderUrl}
            layout='intrinsic'
            height={imageData.size.height}
            placeholder='blur'
            priority
            src={imageData.imageUrl}
            width={imageData.size.width}
          />
          <SpacePicModal imageData={imageData} />
        </>
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
