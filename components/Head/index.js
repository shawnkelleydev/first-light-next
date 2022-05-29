import HeadData from 'next/head'

import { meta } from 'constants/data'

export default function Head() {
  return (
    <HeadData>
      <title>{meta.TITLE}</title>
      <meta
        name='description'
        content={meta.DESCRIPTION}
      />
      <meta
        name='keywords'
        content={meta.KEYWORDS}
      />
      {/* TODO: Add custom favicon to public */}
      <link
        rel='icon'
        href='/favicon.ico'
      />
    </HeadData>
  )
}
