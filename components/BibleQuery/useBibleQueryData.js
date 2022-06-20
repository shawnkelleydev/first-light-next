import { useEffect, useReducer } from 'react'
import { useRouter } from 'next/router'

import { BIBLE_QUERY_ACTION_TYPES } from 'utils/constants/esv'

export default function useBibleQueryData({ passageData }) {
  const router = useRouter()

  const initialState = {
    query: '',
    errorMessage: '',
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case BIBLE_QUERY_ACTION_TYPES.setQuery:
        return { ...state, query: action.query }
      case BIBLE_QUERY_ACTION_TYPES.setError:
        return { ...state, errorMessage: action.errorMessage }
      default:
        throw new Error()
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const { query, errorMessage } = state

  useEffect(() => {
    if (passageData) {
      const { canonical } = passageData
      canonical.length < 1 &&
        dispatch({
          type: BIBLE_QUERY_ACTION_TYPES.setError,
          errorMessage: 'Passage not found.  Please try again.',
        })
    }
  }, [passageData])

  const handleSubmit = event => {
    event.preventDefault()
    if (!query.length)
      dispatch({
        type: BIBLE_QUERY_ACTION_TYPES.setError,
        errorMessage: 'Please provide input.',
      })
    if (query.length) {
      dispatch({
        type: BIBLE_QUERY_ACTION_TYPES.setError,
        errorMessage: '',
      })
      router.push(`/bible?q=${query.toLowerCase()}`)
    }
  }

  return [dispatch, handleSubmit, query, errorMessage]
}
