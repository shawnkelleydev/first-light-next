import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getEarchPic } from 'utils/nasa'

import styles from './styles.module.css'

export default function EarthPic() {
  const [earthPic, setEarthPic] = useState(null)

  useEffect(() => {
    ;(async () => {
      const pic = await getEarchPic()
      setEarthPic(pic)
    })()
  }, [])

  if (!earthPic)
    return (
      <div className={styles['earth-pic']}>
        <h2>LOADING...</h2>
      </div>
    )

  return (
    <div className={styles['earth-pic']}>
      <Image
        src={earthPic}
        width='2048'
        height='2048'
        layout='responsive'
      />
    </div>
  )
}
