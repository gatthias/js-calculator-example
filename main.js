// Wrap in IIFE (Immediately Invoked Function Expression) to avoid pollution of global scope.
(function () {
  /**
   * Init our application
   */
  const calculator = new Calculator();
  const calculatorView = new CalculatorView(document, calculator);
})();