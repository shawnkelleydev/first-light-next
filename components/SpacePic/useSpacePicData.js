import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { getNasaImage } from 'services/nasa'

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

    const getImage = async () => {
      let index = 0
      let data

      while (!data && index < 10) {
        data = await getNasaImage(query)
        index++
      }

      data && setImageData(data)
      data && setError(false)

      !data && setError(true)
    }

    query && getImage()
  }, [query])

  return [imageData, error]
}
