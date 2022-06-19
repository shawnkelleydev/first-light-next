import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { getNasaImage } from 'services/nasa'

export default function useSpacePicData() {
  const [query, setQuery] = useState(null)

  const [imageData, setImageData] = useState(null)

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const { q } = router.query
    q && setQuery(q)
  }, [router])

  useEffect(() => {
    setError(false)
    setLoading(true)

    const getImage = async () => {
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
    }

    query && getImage()
  }, [query])

  return [imageData, error, loading]
}
