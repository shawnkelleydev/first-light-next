import styles from './styles.module.css'

export default function DailyVerse() {
  return (
    <div className={styles['daily-verse']}>
      <blockquote>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        suscipit tempus massa nec dapibus. Integer tincidunt interdum
        condimentum.
      </blockquote>
      <cite>lorem 1:11</cite>
    </div>
  )
}
