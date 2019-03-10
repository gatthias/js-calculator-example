// Declare our operators list
const operatorsList = ['clearElement', 'clear', 'back', 'div', 'mul', 'sub', 'add', 'sign', 'dot', 'equals'];

// Grab our screen element
const prevValueScreen = document.getElementById('calculator__prev-value');
const operatorScreen = document.getElementById('calculator__operator');
const myScreen = document.getElementById('calculator__screen-value');

// Init our state
let prevValue = 0;
let currentValueString = "0";
let currentValue = 0;
let currentOperatorSymbol = null;
let hasInput = false;

// Init screen value
refreshScreen();

// Grab all our buttons
const buttons = document.getElementsByClassName("calculator__button");
for (let button of buttons) {
  button.addEventListener('click', processClick.bind(button));
}


/////////////////////////////
//  Helper functions
//

/**
 * Refresh our screen with current value
 */
function refreshScreen() {
  if (currentOperatorSymbol == null) {
    prevValueScreen.textContent = "";
    operatorScreen.textContent = "";
  } else {
    prevValueScreen.textContent = prevValue.toString();
    operatorScreen.textContent = currentOperatorSymbol;
  }

  myScreen.value = currentValueString;
}

/**
 * Process a click on one of our buttons. When called, 'this' is bound to the clicked button
 * 
 * @param {MouseEvent} event DOM event generated by the click
 */
function processClick(event) {
  const buttonValue = this.value;
  if (isOperator(buttonValue)) {
    processOperator(buttonValue);
  } else {
    processNumber(buttonValue);
  }
}

/**
 * Process one of our calculator's operator
 * @param {any} operatorSymbol  The symbol of the operator to process
 */
function processOperator(operatorSymbol) {
  switch (operatorSymbol) {
    case 'add':
    case 'sub':
    case 'mul':
    case 'div':
      if (hasInput) {
        // Process input, new line
        if (currentOperatorSymbol != null) {
          // Process operation
          processCurrentOperation();
        } else {
          // Set previous value from current input
          prevValue = parseFloat(currentValueString);
        }

        // Update the currentOperator
        currentOperatorSymbol = operatorSymbol;
        // Set state to no input
        hasInput = false;
      } else {
        // Just change the currentOperator
        currentOperatorSymbol = operatorSymbol;
      }
  }

  // Refresh the screen
  refreshScreen();
}

/**
 * Process the current operation. Update prevValue to (prevValue [currentOperator] currentValue)
 */
function processCurrentOperation() {
  const currentValue = parseFloat(currentValueString);

  switch (currentOperatorSymbol) {
    case 'add':
      prevValue = prevValue + currentValue;
      break;
    case 'sub':
      prevValue = prevValue - currentValue;
      break;
    case 'mul':
      prevValue = prevValue * currentValue;
      break;
    case 'div':
      prevValue = prevValue / currentValue;
      break;
    default:
      // Do nothing
  }
}

/**
 * Process a number input
 * @param {any} numberAsString  The input number as a string
 */
function processNumber(numberAsString) {
  if (!hasInput) {
    hasInput = true;
    currentValueString = numberAsString;
  } else {
    currentValueString += numberAsString;
  }
  
  refreshScreen();
}

/**
 * Check if symbol is an operator
 * 
 * @param {any} stringValue Test value
 * 
 * @returns {boolean} True if value is a known operator
 */
function isOperator(stringValue) {
  return operatorsList.indexOf(stringValue) > -1;
}

/**
 * Check if symbol is a number
 * 
 * @param {any} stringValue Test value
 * 
 * @returns {boolean} True if value is a number
 */
function isNumber(stringValue) {
  return !isNaN(parseFloat(stringValue));
}