export const randomString = (characterSet: string, length: number): string => {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += characterSet.charAt(Math.floor(Math.random() * characterSet.length))
  }

  return result
}

export const getChallengeString = (length: number): string => {
  // does not contain small 'L' and big 'i' - would cause UX problems
  const possibleCharacters =
    'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789!?.,;-+=()[]{}@%&$' +
    '!?.,;-+=()[]{}@%&$'

  return randomString(possibleCharacters, length)
}
