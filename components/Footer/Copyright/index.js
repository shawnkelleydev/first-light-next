// throws async errors with aliasing
import { meta } from 'constants/data'

import styles from './styles.module.css'

export default function Footer() {
  return (
    <ul className={styles.ul}>
      <li>
        Copyright © {meta.CURRENT_YEAR} {meta.AUTHOR}.
      </li>
      <li>All rights reserved.</li>
    </ul>
  )
}
