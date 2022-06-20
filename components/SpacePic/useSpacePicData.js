import { useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'

import { ACTION_TYPES } from 'utils/constants/nasa'
import { getNasaImageObject } from 'utils/nasa'

export default function useSpacePicData() {
  const router = useRouter()

  const intitialState = {
    query: null,
    imageObject: null,
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case ACTION_TYPES.reset:
        return { ...state, imageObject: null }
      case ACTION_TYPES.setQuery:
        return { ...state, query: action.query }
      case ACTION_TYPES.setImageObject:
        return { ...state, imageObject: action.imageObject }
      default:
        throw new Error()
    }
  }

  const [state, dispatch] = useReducer(reducer, intitialState)
  const { query, imageObject } = state

  useEffect(() => {
    const { q } = router.query
    q && dispatch({ type: ACTION_TYPES.setQuery, query: q })
  }, [router])

  useEffect(() => {
    dispatch({ type: ACTION_TYPES.reset })

    query &&
      getNasaImageObject(query).then(imageObject =>
        dispatch({ type: ACTION_TYPES.setImageObject, imageObject })
      )
  }, [query])

  return [imageObject]
}
