import Image from 'next/image'

import styles from './styles.module.css'

export default function EarthPic({ earthPicData }) {
  const { imageData, imageUrl } = earthPicData
  const { caption, date } = imageData

  return (
    <div
      className={styles['earth-pic']}
      data-caption={caption}
      data-date={date}
    >
      <Image
        alt={`Earth from space, taken on ${date}`}
        blurDataURL='/earth.jpg'
        height='2048'
        layout='responsive'
        placeholder='blur'
        priority
        src={imageUrl}
        width='2048'
      />
    </div>
  )
}
