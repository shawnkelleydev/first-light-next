import axios from 'axios'

const key = process.env.NEXT_PUBLIC_NASA_API_KEY

export const getApod = async () => {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${key}`
  const data = await axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => console.error('apod error', err))
  return data
}

export const getEarthPic = async () => {
  let url = `https://api.nasa.gov/EPIC/api/natural/images?api_key=${key}`
  const picUrl = await axios
    .get(url)
    .then((res) => {
      const imageList = res.data
      const n = Math.floor(Math.random() * imageList.length)

      const imageData = imageList[n]

      const dateArray = imageData.date.split(' ')[0].split('-')
      const { image } = imageData

      return `https://api.nasa.gov/EPIC/archive/natural/${dateArray[0]}/${dateArray[1]}/${dateArray[2]}/png/${image}.png?api_key=${key}`
    })
    .catch((err) => console.error(err))
  return picUrl
}
