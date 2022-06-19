import Image from 'next/image'

import useSpacePicData from './useSpacePicData'

import Error from 'components/Error'
import Loader from 'components/Loader'

import styles from './styles.module.css'

export default function SpacePic() {
  const [imageData, error, loading] = useSpacePicData()

  if (loading) return <Loader />

  if (error)
    return (
      <Error
        redirect='/space'
        actionText='try again'
      />
    )

  return (
    <div className={styles['space-pic']}>
      <Image
        alt={imageData.title}
        blurDataURL={imageData.placeholderUrl}
        layout='fill'
        objectFit='contain'
        objectPosition='center'
        placeholder='blur'
        priority
        src={imageData.imageUrl}
      />
    </div>
  )
}
