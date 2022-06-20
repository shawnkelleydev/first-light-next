import { verses } from 'utils/constants/verses'
import { getRandomIndex } from 'utils/math'

export const getRandomVerse = () => {
  const n = getRandomIndex(verses.length)
  const verse = verses[n]
  return verse
}

export const processPassageHtml = html => {
  return html.replaceAll('<b', '<sup').replaceAll('</b>', '</sup>')
}

export const truncateCitation = citation => {
  return citation.split(':')[0]
}
