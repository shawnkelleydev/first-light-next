import { BIBLE_QUERY_ACTION_TYPES } from 'utils/constants/esv'

import useBibleQueryData from './useBibleQueryData'

import styles from './styles.module.css'

export default function BibleQuery({ passageData }) {
  const [dispatch, handleSubmit, query, errorMessage] = useBibleQueryData({
    passageData,
  })

  return (
    <form
      className={styles['bible-query']}
      onSubmit={event => handleSubmit(event)}
    >
      <fieldset data-error-message={errorMessage}>
        <legend>Go to a passage</legend>
        <div>
          <input
            onChange={event =>
              dispatch({
                type: BIBLE_QUERY_ACTION_TYPES.setQuery,
                query: event.target.value,
              })
            }
            type='text'
            value={query}
          />
          <button type='submit'>go</button>
        </div>
      </fieldset>
    </form>
  )
}
