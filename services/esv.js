import axios from 'axios'

import { getRandomVerse } from 'utils/esv'
import { getEsvUrl } from 'utils/url'

export const getPassageData = async rawCitation => {
  const key = process.env.NEXT_PUBLIC_ESV_API_KEY

  const url = getEsvUrl('html', rawCitation)
  const headers = {
    Authorization: `Token ${key}`,
  }

  return await axios
    .get(url, { headers })
    .then(res => res.data)
    .catch(err => console.error(err))
}

export const getRandomPassageData = async () => {
  return await getPassageData(getRandomVerse())
}
