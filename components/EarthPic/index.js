import Image from 'next/image'

import styles from './styles.module.css'

export default function EarthPic({ earthPicData }) {
  const { imageData, imageUrl } = earthPicData
  const { caption, date } = imageData

  console.log(earthPicData)

  return (
    <div
      className={styles['earth-pic']}
      data-caption={caption}
      data-date={date}
    >
      <Image
        alt={`Earth from space, taken on ${date}`}
        height='2048'
        layout='responsive'
        priority
        src={imageUrl}
        width='2048'
      />
    </div>
  )
}
