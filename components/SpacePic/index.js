import Image from 'next/image'
import Link from 'next/link'

import useSpacePicData from './useSpacePicData'

import Loader from 'components/Loader'

import styles from './styles.module.css'

export default function SpacePic() {
  const [imageData, error, loading] = useSpacePicData()

  if (loading) return <Loader />

  if (error)
    return (
      <div className={styles.error}>
        <h2>Oops...</h2>
        <p>Something went wrong.</p>
        <Link href='/space'>
          <a>
            <button>try again</button>
          </a>
        </Link>
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
