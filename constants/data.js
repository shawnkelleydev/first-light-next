const getYear = (epoc) => {
  return epoc.getFullYear()
}

export const meta = {
  AUTHOR: 'Shawn Kelley',
  CURRENT_YEAR: getYear(new Date()),
  DESCRIPTION: 'A daily devotional app featuring all things cosmic.',
  KEYWORDS: 'bible, devotional, space, nasa',
  TITLE: 'First Light',
}

export const pages = ['bible', 'space']
