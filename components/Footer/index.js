import Copyright from './Copyright'
// import Links from './Links'

import styles from './styles.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Copyright />
      {/* TODO: links or no links? */}
      {/* <Links /> */}
    </footer>
  )
}
