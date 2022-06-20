import { getRandomIndex, getRandomNumber } from 'utils/math'
import {
  fetchImageMetadata,
  fetchNasaImageData,
  queryNasa,
  fetchImagesByPage,
} from 'services/nasa'
import { convertToHttps } from 'utils/url'

export const buildImageDataObject = async (title, imageOptions) => {
  const imageUrl = convertToHttps(
    imageOptions.find(url => url.includes('orig'))
  )
  const placeholderUrl = convertToHttps(
    imageOptions.find(url => url.includes('thumb'))
  )

  const metadata = await fetchImageMetadata(imageOptions)

  const size = {
    width: metadata['Composite:ImageSize']?.split('x')[0],
    height: metadata['Composite:ImageSize']?.split('x')[1],
  }

  const description = metadata['AVAIL:Description']

  return { title, imageUrl, placeholderUrl, size, description }
}

export const filterNasaImages = items => {
  return items.filter(
    item =>
      item.data[0].media_type === 'image' &&
      item.data[0].center?.toLowerCase().includes('jpl')
  )
}

export const getImageDataObject = async query => {
  const rawQueryData = await queryNasa(query)
  const { total_hits } = rawQueryData.data.collection.metadata
  const pageNumber = getRandomPageNumber(total_hits)

  const images = await fetchImagesByPage(query, pageNumber)

  const filteredImages = filterNasaImages(images)
  if (!filteredImages.length) return null

  const randomIndex = getRandomIndex(filteredImages.length)
  const selectedImageQueryData = filteredImages[randomIndex]

  const { title } = selectedImageQueryData.data[0]
  const imageData = await fetchNasaImageData(selectedImageQueryData)
  const imageOptions = imageData.data

  const imageDataObject = buildImageDataObject(title, imageOptions)

  return imageDataObject
}

// use this in components
export const getNasaImageData = async query => {
  let data
  let index = 0
  while (index < 10 && !data) {
    data = await getImageDataObject(query)
    index++
  }

  return data
}

export const getRandomPageNumber = hits => {
  const totalPages = Math.ceil(hits / 100)
  const pagesLimitedByMax = totalPages > 100 ? 100 : totalPages
  return getRandomNumber(pagesLimitedByMax)
}
