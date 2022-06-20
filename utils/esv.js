import { verses } from 'utils/constants/verses'
import { getRandomIndex } from 'utils/math'
import { encodeString } from './url'

export const getEsvUrl = (type, rawCitation) =>
  `https://api.esv.org/v3/passage/${type}/?q=${encodeString(rawCitation)}`

export const getRandomVerse = () => verses[getRandomIndex(verses.length)]

export const processPassageHtml = html =>
  html.replaceAll('<b', '<sup').replaceAll('</b>', '</sup>')

export const truncateCitation = citation => citation.split(':')[0]

export const verifyContent = content => !!content?.length
