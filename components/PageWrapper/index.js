import Footer from 'components/Footer'
import Header from 'components/Header'
import PageContent from 'components/PageContent'

import styles from './styles.module.css'

export default function PageWrapper({ children }) {
  return (
    <div className={styles['page-wrapper']}>
      <PageContent>{children}</PageContent>
      <Header />
      <Footer />
    </div>
  )
}
