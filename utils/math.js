export const getRandomIndex = limit => Math.floor(Math.random() * limit)

export const getRandomNumber = limit => Math.ceil(Math.random() * limit)

export const selectRandomItem = array => array[getRandomIndex(array.length)]
