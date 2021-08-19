const timeElement = document.querySelector('#time'),
  initialTime = new Date(),
  getTime = date => {
    let hours = date.getHours(),
      minutes = date.getMinutes()
    hours < 10 ? hours = '0' + hours : undefined
    minutes < 10 ? minutes = '0' + minutes : undefined
    timeElement.innerText = hours + ':' + minutes
  }
setInterval(() => getTime(new Date), 60000)

getTime(initialTime)