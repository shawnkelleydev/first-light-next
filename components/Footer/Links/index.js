import Link from 'next/link'
import { footerLinks } from 'constants/data'

import styles from './styles.module.css'

export default function Links() {
  return (
    <ul className={styles.ul}>
      {footerLinks.map((link, i) => (
        <li key={i}>
          <Link href={link.url}>
            <a>{link.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
