import Image from 'next/image'

import useSpacePicData from './useSpacePicData'

import Loader from 'components/Loader'

import styles from './styles.module.css'

export default function SpacePic() {
  const [imageData, error, loading] = useSpacePicData()

  if (loading) return <Loader />

  if (error)
    return (
      <div>
        <h3>Error</h3>
        <p>please try again</p>
      </div>
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
