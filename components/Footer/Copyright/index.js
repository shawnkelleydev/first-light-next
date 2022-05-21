import Link from 'components/Link'

import { meta } from 'constants/data'

import styles from './styles.module.css'

export default function Footer() {
  return (
    <ul className={styles.ul}>
      <li>
        Copyright © {meta.CURRENT_YEAR}{' '}
        <Link url='https://www.shawnkelley.dev'>{meta.AUTHOR}</Link>.
      </li>
      <li>All rights reserved.</li>
    </ul>
  )
}
