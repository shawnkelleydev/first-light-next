import axios from 'axios'
import { getRandomIndexNumber } from 'utils/math'
import { makeHttps } from 'utils/url'

const key = process.env.NEXT_PUBLIC_NASA_API_KEY

export const getApod = async () => {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${key}`
  const data = await axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => console.error('apod error', err))
  return data
}

export const getEarthPicData = async () => {
  let url = `https://api.nasa.gov/EPIC/api/natural/images?api_key=${key}`
  const picUrl = await axios
    .get(url)
    .then((res) => {
      const imageList = res.data
      const n = Math.floor(Math.random() * imageList.length)

      const imageData = imageList[n]

      const dateArray = imageData.date.split(' ')[0].split('-')
      const { image } = imageData

      const imageUrl = `https://api.nasa.gov/EPIC/archive/natural/${dateArray[0]}/${dateArray[1]}/${dateArray[2]}/png/${image}.png?api_key=${key}`
      const data = {
        imageUrl,
        imageData,
      }

      return data
    })
    .catch((err) => console.error(err))
  return picUrl
}

export const queryNasa = async (query) => {
  const url = `https://images-api.nasa.gov/search?q=${query}`
  const response = await axios.get(url).catch((error) => console.error(error))
  return response
}

export const queryNasaByPage = async (query, page) => {
  const url = `https://images-api.nasa.gov/search?q=${query}&page=${page}`
  const response = await axios
    .get(url)
    .catch((error) => console.error('Error in queryNasaByPage: ', error))

  const { items } = response.data.collection

  return items
}

export const getNasaImageData = async (rawQueryData) => {
  const { href } = rawQueryData

  const metadata = await axios
    .get(href)
    .catch((error) => console.error('error in getNasaImageData', error))

  return metadata
}

export const getNasaImageMetadata = async (urlArray) => {
  const metaUrl = makeHttps(
    urlArray.find((url) => url.includes('metadata.json'))
  )
  const { data } = await axios
    .get(metaUrl)
    .catch((error) => console.error('error in getNasaImageMetadata', error))
  return data
}

export const getQualifiedImages = (items) => {
  const filteredItems = items.filter(
    (item) =>
      item.data[0].media_type === 'image' &&
      item.data[0].center?.toLowerCase().includes('jpl')
  )

  return filteredItems
}

export const getRandomPageNumber = (hits) => {
  const totalPages = Math.ceil(hits / 100)
  const limitedPages = totalPages > 100 ? 100 : totalPages
  return getRandomIndexNumber(limitedPages) + 1
}

export const buildImageDataObject = async (title, arrayOfImages) => {
  const imageUrl = makeHttps(arrayOfImages.find((url) => url.includes('orig')))
  const placeholderUrl = makeHttps(
    arrayOfImages.find((url) => url.includes('thumb'))
  )

  const metadata = await getNasaImageMetadata(arrayOfImages)

  const size = {
    width: metadata['Composite:ImageSize']?.split('x')[0],
    height: metadata['Composite:ImageSize']?.split('x')[1],
  }

  const description = metadata['AVAIL:Description']

  return { title, imageUrl, placeholderUrl, size, description }
}

export const getNasaImage = async (query) => {
  let rawQueryData = await queryNasa(query)
  const { total_hits } = rawQueryData.data.collection.metadata

  const page = getRandomPageNumber(total_hits)

  const items = await queryNasaByPage(query, page)

  const qualifiedImages = getQualifiedImages(items)

  if (qualifiedImages.length < 1) return

  const n = getRandomIndexNumber(qualifiedImages.length)
  const selectedImageQueryData = qualifiedImages[n]

  const { title } = selectedImageQueryData.data[0]
  const imageData = await getNasaImageData(selectedImageQueryData)
  const arrayOfImages = imageData.data

  const imageDataObject = buildImageDataObject(title, arrayOfImages)

  return imageDataObject
}
