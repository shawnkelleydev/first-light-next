import 'normalize.css'
import 'styles/globals.css'

import PageWrapper from 'components/PageWrapper'

function MyApp({ Component, pageProps }) {
  return (
    <PageWrapper>
      <Component {...pageProps} />
    </PageWrapper>
  )
}

export default MyApp
