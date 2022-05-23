import Image from 'next/image'

import styles from './styles.module.css'

export default function EarthPic({ earthPicData }) {
  const { imageUrl } = earthPicData

  return (
    <div className={styles['earth-pic']}>
      <Image
        alt='earth'
        height='2048'
        layout='responsive'
        priority
        src={imageUrl}
        width='2048'
      />
    </div>
  )
}
