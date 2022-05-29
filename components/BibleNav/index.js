import Link from 'components/Link'
import styles from './styles.module.css'

export default function BibleNav({ metadata }) {
  const { prev_chapter, next_chapter } = metadata
  const prevChapterUrl = `/bible?q=${prev_chapter[0]}-${prev_chapter[1]}`
  const nextChapterUrl = `/bible?q=${next_chapter[0]}-${next_chapter[1]}`

  return (
    <div className={styles['bible-nav']}>
      <Link url={prevChapterUrl}>&larr; previous chapter</Link>
      <Link url={nextChapterUrl}>next chapter &rarr;</Link>
    </div>
  )
}
