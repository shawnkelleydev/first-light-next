import Image from 'next/image'

import useSpacePicData from './useSpacePicData'

import Error from 'components/Error'
import Loader from 'components/Loader'

import styles from './styles.module.css'

export default function SpacePic() {
  const [imageData, error] = useSpacePicData()

  if (error)
    return (
      <Error
        redirect='/space'
        actionText='try again'
      />
    )

  if (!imageData) return <Loader />

  const { imageUrl, placeholderUrl, title } = imageData

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
