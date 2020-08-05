export const randomString = (characterSet, length) => {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characterSet.charAt(Math.floor(Math.random() * characterSet.length))
  }

  return result
}

export const getChallengeString = length => {
  // does not contain small 'L' and big 'i' - usability problems
  const possibleCharacters =
    'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789!?.,;-+=()[]{}@%&$' +
    '!?.,;-+=()[]{}@%&$'

  return randomString(possibleCharacters, length)
}
