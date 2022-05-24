import Link from 'components/Link'
import styles from './styles.module.css'

export default function SpacePicModal({ imageData }) {
  const { title, description } = imageData

  return (
    <div className={styles['space-pic-modal']}>
      <figcaption>
        <h3>{title}</h3>
        <p>{description}</p>
        <div>
          <Link url='/space'>get next pic</Link>
        </div>
      </figcaption>
    </div>
  )
}
