import { verses } from 'constants/verses'
import { getRandomNumber } from 'utils/math'

export const getRandomVerse = () => {
  const n = getRandomNumber(verses.length)
  const verse = verses[n]
  return verse
}
