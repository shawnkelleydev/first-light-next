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
      const imageData = imageList[getRandomIndex(imageList.length)]

      const { date, image } = imageData

      const dateArray = date.split(' ')[0].split('-')

      const imageUrl = `https://api.nasa.gov/EPIC/archive/natural/${dateArray[0]}/${dateArray[1]}/${dateArray[2]}/png/${image}.png?api_key=${key}`
      return { imageUrl, imageData }
    })
    .catch(err => console.error(err))
}

export const fetchImageMetadata = async urlArray => {
  const metadataUrl = convertToHttps(
    urlArray.find(url => url.includes('metadata.json'))
  )

  return await axios
    .get(metadataUrl)
    .then(res => res.data)
    .catch(error => console.error('error in fetchImageMetadata', error))
}

export const fetchImagesByPage = async (query, pageNumber) => {
  const url = `https://images-api.nasa.gov/search?q=${query}&page=${pageNumber}`
  return await axios
    .get(url)
    .then(res => res.data.collection.items)
    .catch(error => console.error('Error in fetchImagesByPage: ', error))
}

export const fetchImageOptions = async rawQueryData => {
  const { href } = rawQueryData

  return await axios
    .get(href)
    .catch(error => console.error('error in fetchImageOptions', error))
}

export const queryNasaMediaDatabase = async query => {
  const url = `https://images-api.nasa.gov/search?q=${query}`
  return await axios.get(url).catch(error => console.error(error))
}
