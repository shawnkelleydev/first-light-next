import { queries } from './constants/nasa'
import { getRandomIndex, getRandomNumber, selectRandomItem } from 'utils/math'
import { convertToHttps } from 'utils/url'

import {
  fetchImageMetadata,
  fetchImageOptions,
  queryNasaMediaDatabase,
  fetchImagesByPage,
} from 'services/nasa'

const buildImageDataObject = async (title, imageOptions) => {
  const imageUrl = convertToHttps(
    imageOptions.find(url => url.includes('orig'))
  )
  const placeholderUrl = convertToHttps(
    imageOptions.find(url => url.includes('thumb'))
  )

  const metadata = await fetchImageMetadata(imageOptions)

  const size = getImageSize(metadata)

  const description = metadata['AVAIL:Description']

  return { title, imageUrl, placeholderUrl, size, description }
}

const filterNasaImages = items => {
  return items.filter(
    item =>
      item.data[0].media_type === 'image' &&
      item.data[0].center?.toLowerCase().includes('jpl')
  )
}

const getImageDataObject = async query => {
  const { total_hits } = await queryNasaMediaDatabase(query).then(
    data => data.data.collection.metadata
  )

  const images = await fetchImagesByPage(query, getRandomPageNumber(total_hits))

  const filteredImages = filterNasaImages(images)

  if (!filteredImages.length) return null

  const selectedImage = selectRandomItem(filteredImages)

  const { title } = selectedImage.data[0]
  const { data } = await fetchImageOptions(selectedImage)

  return buildImageDataObject(title, data)
}

const getImageSize = metadata => {
  const width = metadata['Composite:ImageSize']?.split('x')[0]
  const height = metadata['Composite:ImageSize']?.split('x')[1]

  return { width, height }
}

const getRandomPageNumber = hits => {
  const totalPages = Math.ceil(hits / 100)
  const pagesLimitedByMax = totalPages > 100 ? 100 : totalPages
  return getRandomNumber(pagesLimitedByMax)
}

export const hasQuery = path => path.includes('?q=')

// abstraction for components
export const getNasaImage = async query => {
  let data
  let index = 0
  while (index < 10 && !data) {
    data = await getImageDataObject(query)
    index++
  }

  return data
}

export const getQuery = () => queries[getRandomIndex(queries.length)]
