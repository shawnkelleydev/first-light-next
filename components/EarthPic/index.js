import Image from 'next/image'

import styles from './styles.module.css'

export default function EarthPic({ earthPic }) {
  return (
    <div className={styles['earth-pic']}>
      <Image
        height='2048'
        layout='responsive'
        priority
        src={earthPic}
        width='2048'
      />
    </div>
  )
}
