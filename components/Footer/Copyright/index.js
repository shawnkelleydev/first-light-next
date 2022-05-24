import Link from 'components/Link'

import { meta } from 'constants/data'

import styles from './styles.module.css'

export default function Copyright() {
  return (
    <div className={styles.copyright}>
      <small>
        Copyright © {meta.CURRENT_YEAR}{' '}
        <Link url='https://www.shawnkelley.dev'>{meta.AUTHOR}</Link>.
      </small>
      <small>All rights reserved.</small>
    </div>
  )
}
