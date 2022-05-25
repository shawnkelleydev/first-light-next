import { verses } from 'constants/verses'
import { getRandomIndexNumber } from 'utils/math'

export const getRandomVerse = () => {
  const n = getRandomIndexNumber(verses.length)
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
