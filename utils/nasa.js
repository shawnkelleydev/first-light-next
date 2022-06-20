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

const filterNasaImages = items =>
  items.filter(
    item =>
      item.data[0].media_type === 'image' &&
      item.data[0].center?.toLowerCase().includes('jpl')
  )

const getImageSize = metadata => {
  const dimensions = metadata['Composite:ImageSize']?.split('x')

  return { width: dimensions[0], height: dimensions[1] }
}

const getRandomPageNumber = hits => {
  const totalPages = Math.ceil(hits / 100)
  const pagesLimitedByMax = totalPages > 100 ? 100 : totalPages

  return getRandomNumber(pagesLimitedByMax)
}

export const hasQuery = path => path.includes('?')

export const getNasaImageObject = async query => {
  const { total_hits } = await queryNasaMediaDatabase(query).then(
    data => data.data.collection.metadata
  )

  const images = await fetchImagesByPage(query, getRandomPageNumber(total_hits))

  const filteredImages = filterNasaImages(images)

  !filteredImages.length && location.assign('/space')
  if (!filteredImages.length) return

  const selectedImage = selectRandomItem(filteredImages)

  const { title } = selectedImage.data[0]
  const { data } = await fetchImageOptions(selectedImage)

  return buildImageDataObject(title, data)
}

export const getQuery = () => queries[getRandomIndex(queries.length)]
