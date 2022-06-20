import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { getNasaImageData } from 'utils/nasa'

export default function useSpacePicData() {
  const [query, setQuery] = useState(null)

  const [imageData, setImageData] = useState(null)

  const [error, setError] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const { q } = router.query
    q && setQuery(q)
  }, [router])

  useEffect(() => {
    setError(false)
    setImageData(null)

    const handleImageData = imageData => {
      imageData && setImageData(imageData)
      imageData && setError(false)

      !imageData && setError(true)
    }

    query &&
      getNasaImageData(query).then(imageData => handleImageData(imageData))
  }, [query])

  return [imageData, error]
}
