exports.getPlaceholderStringForArray = (arr) => {
  if (!Array.isArray(arr)) {
    throw new Error('invalid inputs')
  }

  // if we have an array we clone the arr
  // and fill the new array with placehoders
  const placeholders = [...arr]
  return placeholders.fill('?').join(',').trim()
}

exports.multipleColumnSet = (object) => {
  if (typeof object !== 'object') {
    throw new Error('Invalid inputs')
  }

  //Extract keys and values from the body of request given
  const keys = Object.keys(object)
  const values = Object.values(object)

  columnSet = keys.map((key) => `${key} = ?`).join(', ')

  console.log(columnSet)

  return {
    columnSet,
    values,
  }
}
