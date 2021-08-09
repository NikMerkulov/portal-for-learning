const timeElement = document.querySelector('#time'),
  initialTime = new Date()
setInterval(() => {
  const currentTime = new Date()
  timeElement.innerText = `${currentTime.getHours()}:${currentTime.getMinutes()}`
}, 60000)

timeElement.innerText = `${initialTime.getHours()}:${initialTime.getMinutes()}`