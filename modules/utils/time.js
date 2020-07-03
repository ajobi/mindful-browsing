const TIME = (function () {
  function format (timeInSeconds) {
  	timeInSeconds = Math.floor(timeInSeconds)

    const hours = Math.floor(timeInSeconds / 3600)
    const minutes = Math.floor((timeInSeconds - hours * 3600) / 60)
    const seconds = timeInSeconds - hours * 3600 - minutes * 60

    const hourString = hours === 1 ? `${hours} hour` : `${hours} hours`
    const minuteString = minutes === 1 ? `${minutes} minute` : `${minutes} minutes`
    const secondString = seconds === 1 ? `${seconds} second` : `${seconds} seconds`

    // resulting time concatenation
    let result = hours > 0 ? hourString : ''

    if (minutes > 0 && result === '') {
      result = result + minuteString
    } else if (minutes > 0) {
      result = seconds === 0 ? `${result} and ${minuteString}` : `${result} ${minuteString}`
    }

    if (seconds > 0 && result === '') {
      result = result + secondString
    } else if (seconds > 0) {
      result = `${result} and ${secondString}`
    }

    return result
  }

  return {
    format
  }
})()
