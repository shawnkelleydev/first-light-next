export const encodeString = string => {
  return string.replace(' ', '%20')
}

export const convertToHttps = url => {
  return url.replace('http', 'https')
}

export const getEsvUrl = (type, rawCitation) => {
  const urlCitation = encodeString(rawCitation)

  return `https://api.esv.org/v3/passage/${type}/?q=${urlCitation}`
}
