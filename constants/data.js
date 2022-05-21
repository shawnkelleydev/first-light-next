const getYear = (epoc) => {
  return epoc.getFullYear()
}

export const meta = {
  // TODO: edit AUTHOR
  AUTHOR: 'author',
  CURRENT_YEAR: getYear(new Date()),
  // TODO: edit DESCRIPTION
  DESCRIPTION: 'description',
  // TODO: edit KEYWORDS
  KEYWORDS: 'keyword1, keyword2, keyword3',
  // TODO: edit/remove TAG
  TAG: 'tag',
  // TODO: edit TITLE
  TITLE: 'title',
}

// TODO: edit pages && change page folder names to match
export const pages = ['page1', 'page2', 'page3']

// TODO: edit footerLinks
export const footerLinks = [
  { name: 'LINK1', url: '/' },
  { name: 'LINK2', url: '/' },
  { name: 'LINK3', url: '/' },
]
