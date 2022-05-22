import { verses } from 'constants/verses'

export const getRandomVerse = () => {
  const n = Math.floor(Math.random() * verses.length)
  const verse = verses[n]
  return verse
}
