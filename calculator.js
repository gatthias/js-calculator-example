/**
  * Calculator: Main class representing our calculator, able to handle string input
  * and process a list of given operators.
  * Only responsible for processing, has no UI on its own
  */
class Calculator {

  prevValue = 0;
  currentValueString = "0";
  currentValue = 0;
  currentOperatorSymbol = null;
  hasInput = false;

  /**
   * Process one of our calculator's operator
   * @param {any} operatorSymbol  The symbol of the operator to process
   */
  processOperator(operatorSymbol) {
    switch (operatorSymbol) {
      case 'add':
      case 'sub':
      case 'mul':
      case 'div':
        if (this.hasInput) {
          // Process input, new line
          if (this.currentOperatorSymbol != null) {
            // Process operation
            this.processCurrentOperation();
          } else {
            // Set previous value from current input
            this.prevValue = parseFloat(this.currentValueString);
          }

          // Update the currentOperator
          this.currentOperatorSymbol = operatorSymbol;
          // Set state to no input
          this.hasInput = false;
        } else {
          // Just change the currentOperator
          this.currentOperatorSymbol = operatorSymbol;
        }
        break;
      case 'equals':
        if (this.currentOperatorSymbol != null) {
          // Process operation
          this.processCurrentOperation();
          // Remove operator
          this.currentOperatorSymbol = null;
          // Copy (calculated) prev value back to currentValue
          this.currentValueString = this.prevValue.toString();
          // Reset input
          this.hasInput = false;
        }
        break;
      case 'clearElement':
        // Reinitialize input
        this.clear(false);
        break;
      case 'clear':
        // Reinitialize everything
        this.clear(true);
        break;
      case 'back':
        this.operatorBack();
        break;
      case 'dot':
        this.operatorDot();
        break;
      case 'sign':
        this.operatorSign();
        break;
    }
  }

  /**
   * Remove last char from currentValueString. Clear input back to "0" if empty.
   */
  operatorBack() {
    // Remove last character of our currentValueString
    this.currentValueString = this.currentValueString.slice(0, this.currentValueString.length - 1);

    // If empty, set back to 0 (string)
    if (this.currentValueString.length == 0) {
      this.currentValueString = "0";
      this.hasInput = false;
    }
  }

  /**
   * Add a decimal symbol in our currentValueString, if not already present
   */
  operatorDot() {
    // Check if already decimal
    if (this.currentValueString.indexOf('.') > -1) {
      return;
    }
    // If not, add a . at the end of currentValueString
    this.currentValueString += ".";
    this.hasInput = true;
  }

  /**
   * Toggles a '-' symbol in front of our currentValueString
   */
  operatorSign() {
    if (!this.hasInput) {
      return;
    }
    // Check if has a sign
    if (this.currentValueString[0] === "-") {
      // Strip first character
      this.currentValueString = this.currentValueString.slice(1, this.currentValueString.length);
    } else {
      // Add a '-' before our string
      this.currentValueString = '-' + this.currentValueString;
    }
  }

  /**
   * Reset our calculator state
   * @param {any} bEverything Should we reset only the current element or everything
   */
  clear(bEverything) {
    this.currentValueString = "0";
    this.hasInput = false;

    if (bEverything) {
      this.prevValue = 0;
      this.currentOperatorSymbol = null;
    }
  }

  /**
   * Process the current operation. Update prevValue to (prevValue [currentOperator] currentValue)
   */
  processCurrentOperation() {
    const currentValue = parseFloat(this.currentValueString);

    switch (this.currentOperatorSymbol) {
      case 'add':
        this.prevValue = this.prevValue + currentValue;
        break;
      case 'sub':
        this.prevValue = this.prevValue - currentValue;
        break;
      case 'mul':
        this.prevValue = this.prevValue * currentValue;
        break;
      case 'div':
        this.prevValue = this.prevValue / currentValue;
        break;
      default:
      // Do nothing
    }
  }

  /**
   * Process a number input
   * @param {any} numberAsString  The input number as a string
   */
  processNumber(numberAsString) {
    if (!this.hasInput) {
      this.hasInput = true;
      this.currentValueString = numberAsString;
    } else {
      this.currentValueString += numberAsString;
    }
  }
}

// Our operators list
Calculator.operatorsList = ['clearElement', 'clear', 'back', 'div', 'mul', 'sub', 'add', 'sign', 'dot', 'equals'];

/**
  * Check if symbol is an operator
  * 
  * @param {any} stringValue Test value
  * 
  * @returns {boolean} True if value is a known operator
  */
Calculator.isOperator = function (stringValue) {
  return Calculator.operatorsList.indexOf(stringValue) > -1;
}

/**
 * Check if symbol is a number
 * 
 * @param {any} stringValue Test value
 * 
 * @returns {boolean} True if value is a number
 */
Calculator.isNumber = function (stringValue) {
  return !isNaN(parseFloat(stringValue));
}