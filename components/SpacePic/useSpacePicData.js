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
      const getData = async (index) => {
        if (index > 10) return

        const data = await getNasaImage(query, index)
        index++

        if (data) return data
        return await getData(index)
      }

      let index = 0
      const data = await getData(index)

      data && setImageData(data)
      data && setError(false)

      !data && setError(true)

      setLoading(false)
    }

    query && getImage()
  }, [query])

  return [imageData, error, loading]
}
