import Link from 'next/link'
import { meta } from 'utils/constants/metadata'

import styles from './styles.module.css'

export default function Logo() {
  const text = meta.TITLE.split(' ')

  return (
    <div className={styles.logo}>
      <Link href='/'>
        <a>
          <h1>
            {text.map((word, index) => (
              <span key={index}>{word}</span>
            ))}
          </h1>
        </a>
      </Link>
    </div>
  )
}
