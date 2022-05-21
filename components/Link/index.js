import External from './External'
import Internal from './Internal'

import styles from './styles.module.css'

export default function Link({ children, url }) {
  if (url.charAt(0) === '/')
    return <Internal styles={styles} text={children} url={url} />

  return <External styles={styles} text={children} url={url} />
}
