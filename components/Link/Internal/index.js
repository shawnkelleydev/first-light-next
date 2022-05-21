import Link from 'next/link'
import { useRouter } from 'next/router'

export default function External({ styles, text, url }) {
  let { route } = useRouter()

  const checkForMatch = () => {
    let match = false
    const words = text.replace(/[?.!]/g, '').split(' ')
    words.forEach((word) => (route.includes(word) ? (match = true) : null))
    if (text === 'home' && route === '/') match = true
    return match
  }

  return (
    <Link href={url}>
      <a className={`${styles.a} ${checkForMatch() ? styles.active : ''}`}>
        {text}
      </a>
    </Link>
  )
}
