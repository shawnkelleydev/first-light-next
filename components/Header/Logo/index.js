import Link from 'next/link'
import { meta } from 'constants/data'

import styles from './styles.module.css'

export default function Logo() {
  return (
    <div className={styles.logo}>
      <Link href='/'>
        <a>
          <h1>
            <b>{meta.TITLE}</b>
            {/* TODO: optional <small>{meta.TAG}</small> */}
          </h1>
        </a>
      </Link>
    </div>
  )
}
