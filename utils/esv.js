import { verses } from 'constants/verses'
import { getRandomNumber } from 'utils/math'

export const getRandomVerse = () => {
  const n = getRandomNumber(verses.length)
  const verse = verses[n]
  return verse
}

export const processPassageHtml = (html) => {
  return html
    .replaceAll('<b', '<sup')
    .replaceAll('</b>', '</sup>')
    .replaceAll('&nbsp;', '')
}

export const truncateCitation = (citation) => {
  return citation.split(':')[0]
}
