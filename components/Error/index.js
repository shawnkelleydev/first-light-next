import Link from 'next/link'

import styles from './styles.module.css'

export default function Error({ redirect, actionText }) {
  return (
    <div className={styles.error}>
      <h2>Oops...</h2>
      <p>Something went wrong.</p>
      <Link href={redirect}>
        <a>
          <button>{actionText}</button>
        </a>
      </Link>
    </div>
  )
}
