export default function External({ styles, text, url }) {
  return (
    <a href={url} className={styles.a} target='_blank' rel='noreferrer'>
      {text}
    </a>
  )
}
