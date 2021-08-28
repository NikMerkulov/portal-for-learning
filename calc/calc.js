let calculatable = false,
  clearInput = true,
  operation = '',
  firstNumber = 0, 
  secondNumber = 0,
  result = 0,
  calculated = false
const inputEl = document.querySelector('#input'),
  operationEl = document.querySelector('#operation'),
  MAX_NUMBER_LENGTH = 16
  removeCommas = str => str.replace(/,/g, ''),
  addCommas = num => Intl.NumberFormat('en-US', {maximumFractionDigits: MAX_NUMBER_LENGTH}).format(+num),
  addToInputValue = value => {
    let inputValue = inputEl.innerText
    temp = removeCommas(inputValue)
    temp += value
    setInputValue(temp)
  },
  setInputValue = num => {
    if (typeof num !== 'string') {
      num = num.toString()
    }
    if (num === '')
      inputEl.innerText = ''
    if (num.split('.')[0].length <= MAX_NUMBER_LENGTH && num >= 0) {
      inputEl.innerText = num.includes('.') ?
      addCommas(num.slice(0, MAX_NUMBER_LENGTH + 1)) :
      addCommas(num.slice(0, MAX_NUMBER_LENGTH))
    } else if (num.split('.')[0].length <= MAX_NUMBER_LENGTH && num < 0) {
      inputEl.innerText = num.includes('.') ?
      addCommas(num.slice(0, MAX_NUMBER_LENGTH + 2)) :
      addCommas(num.slice(0, MAX_NUMBER_LENGTH + 1))
    } else {
      inputEl.innerText = 'Out of range'
      calculatable = false
    }
  },
  clear = () => {
    setInputValue(0)
    operationEl.innerText = ''
    calculatable = false
    clearInput = true
    calculated = false
    operation = ''
    firstNumber = 0
    secondNumber = 0
    result = 0
  },
  prepare = () => {
    if (operation === 'rexp') {
      operationEl.innerText = '^ ' + addCommas(firstNumber)
    } else operationEl.innerText = addCommas(firstNumber) + ' ' + operation
    calculatable = true
    clearInput = true
    calculated = false
  },
  calculate = () => {
    if (firstNumber === 0 && operation === '')
      return undefined
    if (calculated) {
      if (operation === 'sqrt' || operation === 'log') {
        secondNumber = result
      } else firstNumber = result
      if (result.toString().split('.')[0].length <= MAX_NUMBER_LENGTH) 
        prepare()
    } else {
      secondNumber = parseFloat(removeCommas(inputEl.innerText))
    }
    if (operation !== 'rexp')
      operationEl.innerText += ' ' + addCommas(secondNumber) + ' ='
    switch (operation) {
      case '/': 
        if (secondNumber === '0')
          alert('I see what you tried to do here!')
        result = firstNumber / secondNumber
        break
      case '%':
        if (secondNumber === '0')
          alert('I see what you tried to do here!')
        result = firstNumber > secondNumber ? firstNumber % secondNumber : 0
        break
      case '+':
        result = firstNumber + secondNumber
        break
      case '-':
        result = firstNumber - secondNumber
        break
      case '*':
        result = firstNumber * secondNumber
        break
      case 'sqrt':
        firstNumber = secondNumber
        operationEl.innerText = `√( ${addCommas(firstNumber)} )`
        result = Math.sqrt(firstNumber)
        clearInput = true
        break
      case 'log': 
        firstNumber = secondNumber
        operationEl.innerText = `ln( ${addCommas(firstNumber)} )`
        result = Math.log(firstNumber)
        clearInput = true
        break
      case '^': 
        result = firstNumber ** secondNumber
        break
      case 'rexp':
        result = secondNumber ** firstNumber
        operationEl.innerText = addCommas(secondNumber) + ' ' + operationEl.innerText + ' ='
        break
    }
    setInputValue(result)
    calculated = true
    calculatable = false
  }
document.querySelector('#calc').onclick = (event => {
  switch (event.target.className) {
    case 'number':
      if (calculated && !calculatable)
        clear()
      if (clearInput) {
        setInputValue('')
        clearInput = false
      }
      addToInputValue(event.target.innerText)
      break
    case 'func':
      if (calculated) {
        operationEl.innerText = inputEl.innerText
      }
      firstNumber = parseFloat(removeCommas(inputEl.innerText))
      switch (event.target.id) {
        case 'clear':
          clear()
          break
        case 'add':
          operation = '+'
          prepare()
          break
        case 'subtract':
          operation = '-'
          prepare()
          break
        case 'multiply':
          operation = '*'
          prepare()
          break
        case 'sqrt':
          operation = 'sqrt'
          calculate()
          break
        case 'log': 
          operation = 'log'
          calculate()
          break
        case 'exp':
          operation = '^'
          prepare()
          break
        case 'rexp':
          operation = 'rexp'
          prepare()
          break
      }
      break
    case 'division':
      if (calculated) {
        operationEl.innerText = inputEl.innerText
      }
      firstNumber = parseFloat(removeCommas(inputEl.innerText))
      switch (event.target.id) {
        case 'division':
          operation = '/'
          prepare()
          break
        case 'rdivision':
          operation = '%'
          prepare()
          break
      }
      break
  }
})
document.querySelector('body').onkeydown = (({key}) => {
  if (key === 'Enter') 
    calculate()
})