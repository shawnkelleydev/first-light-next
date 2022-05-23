import { useEffect, useState } from 'react'

import styles from './styles.module.css'

export default function Loader() {
  const [flip, setFlip] = useState(true)

  useEffect(() => {
    setTimeout(() => setFlip(!flip), 200)
  }, [flip])

  return (
    <div className={styles.loader}>
      <span data-active={flip} />
      <span data-active={!flip} />
      <span data-active={flip} />
    </div>
  )
}
