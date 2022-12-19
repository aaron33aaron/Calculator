// Aaron Leblanc - 2022-12-18 - Calculator program

let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

// assigning all calculator elements for DOM Manipulation
const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.getElementById('equalsBtn')
const clearButton = document.getElementById('clearBtn')
const deleteButton = document.getElementById('deleteBtn')
const pointButton = document.getElementById('pointBtn')
const lastOperationScreen = document.getElementById('lastOperationScreen')
const currentOperationScreen = document.getElementById('currentOperationScreen')

// event listeners for all calculator buttons
window.addEventListener('keydown', handleKeyboardInput)
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
pointButton.addEventListener('click', appendPoint)

// for each number button on calculator
numberButtons.forEach((button) => 
  // adding click event listener that will append the number to the current operations screen
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) => 
  // click event listner that calls setOperation and appends the selected operator to the operations screen
  button.addEventListener('click', () => setOperation(button.textContent))
)

// function used to append numbers to the operations screen
function appendNumber(number) {
  if (currentOperationScreen.textContent === '0' || shouldResetScreen)
    resetScreen()
  currentOperationScreen.textContent += number
}

// function used to reset the current operations screen
function resetScreen() {
  currentOperationScreen.textContent = ''
  shouldResetScreen = false
}

// function used to clear all values and screens
function clear() {
  currentOperationScreen.textContent = '0'
  lastOperationScreen.textContent = ''
  firstOperand = ''
  secondOperand = ''
  currentOperation = null
}

// function used to append decimal points onto the current operations screen
function appendPoint() {
  if (shouldResetScreen) resetScreen()
  if (currentOperationScreen.textContent === '')
    currentOperationScreen.textContent = '0'
  if (currentOperationScreen.textContent.includes('.')) return
  currentOperationScreen.textContent += '.'
}

// function used to delete a number from the current operation stack
function deleteNumber() {
  // deletes the most recent number in the operation screen stack
  currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(0, -1)
}

// functions used to set the operator when clicked
function setOperation(operator) {
  // if the currentOperation variable is null call evaluate function
  if (currentOperation !== null) evaluate()
  firstOperand = currentOperationScreen.textContent
  currentOperation = operator
  // setting the last operations screen
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`
  // resetting the current operation screen
  shouldResetScreen = true;
}

// function used to evaluate the current expression on the curren operations screen
function evaluate() {
  if (currentOperation === null || shouldResetScreen) return
  if (currentOperation === '÷' && currentOperationScreen.textContent === '0') {
    alert("You can't divide by 0!")
    return
  }
  secondOperand = currentOperationScreen.textContent
  currentOperationScreen.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  )
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
  currentOperation = null
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000
}

// function used to handle any possible keyboard input that should have a result
function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
  if (e.key === '.') appendPoint()
  if (e.key === '=' || e.key === 'Enter') evaluate()
  if (e.key === 'Backspace') deleteNumber()
  if (e.key === 'Escape') clear()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '÷'
  if (keyboardOperator === '*') return '×'
  if (keyboardOperator === '-') return '−'
  if (keyboardOperator === '+') return '+'
}


function add(a, b) {
  return a + b
}

function substract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  return a / b
}


function operate(operator, a, b) {
  a = Number(a)
  b = Number(b)
  switch (operator) {
    case '+':
      return add(a, b)
    case '−':
      return substract(a, b)
    case '×':
      return multiply(a, b)
    case '÷':
      if (b === 0) return null
      else return divide(a, b)
    default:
      return null
  }
}