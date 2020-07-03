const STRINGS = (function() {
  function _getRandomString(charSet, length) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }

    return result;
  }

  function getChallengeString(length) {
    // does not contain small 'L' and big 'i' - usability problems
    const possibleCharacters =
      'ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789!?.,;-+=()[]{}@%&$' +
      '!?.,;-+=()[]{}@%&$';

    return _getRandomString(possibleCharacters, length);
  }

  return {
    getChallengeString
  };
})();
