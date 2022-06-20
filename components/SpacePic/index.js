import Image from 'next/image'

import useSpacePicData from './useSpacePicData'

import Loader from 'components/Loader'

import styles from './styles.module.css'

export default function SpacePic() {
  const [imageObject] = useSpacePicData()

  if (!imageObject) return <Loader />

  const { imageUrl, placeholderUrl, title } = imageObject

  return (
    <div className={styles['space-pic']}>
      <Image
        alt={title}
        blurDataURL={placeholderUrl}
        layout='fill'
        objectFit='contain'
        objectPosition='center'
        placeholder='blur'
        priority
        src={imageUrl}
      />
    </div>
  )
}
