import axios from 'axios'

import { getRandomIndex } from 'utils/math'
import { convertToHttps } from 'utils/url'

const key = process.env.NEXT_PUBLIC_NASA_API_KEY

export const fetchApod = async () => {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${key}`
  return await axios
    .get(url)
    .then(res => res.data)
    .catch(err => console.error('apod error', err))
}

export const fetchEarthPicData = async () => {
  let url = `https://api.nasa.gov/EPIC/api/natural/images?api_key=${key}`
  return await axios
    .get(url)
    .then(res => {
      const imageList = res.data
      const n = getRandomIndex(imageList.length)

      const imageData = imageList[n]

      const dateArray = imageData.date.split(' ')[0].split('-')
      const { image } = imageData

      const imageUrl = `https://api.nasa.gov/EPIC/archive/natural/${dateArray[0]}/${dateArray[1]}/${dateArray[2]}/png/${image}.png?api_key=${key}`
      const dataObject = {
        imageUrl,
        imageData,
      }

      return dataObject
    })
    .catch(err => console.error(err))
}

export const fetchImageMetadata = async urlArray => {
  const metadataUrl = convertToHttps(
    urlArray.find(url => url.includes('metadata.json'))
  )

  const { data } = await axios
    .get(metadataUrl)
    .catch(error => console.error('error in fetchImageMetadata', error))
  return data
}

export const fetchImagesByPage = async (query, pageNumber) => {
  const url = `https://images-api.nasa.gov/search?q=${query}&page=${pageNumber}`
  const response = await axios
    .get(url)
    .catch(error => console.error('Error in fetchImagesByPage: ', error))

  const { items } = response.data.collection

  return items
}

export const fetchNasaImageData = async rawQueryData => {
  const { href } = rawQueryData

  return await axios
    .get(href)
    .catch(error => console.error('error in fetchNasaImageData', error))
}

export const queryNasa = async query => {
  const url = `https://images-api.nasa.gov/search?q=${query}`
  return await axios.get(url).catch(error => console.error(error))
}
