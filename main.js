// Grab our screen element
const myScreen = document.getElementById('calculator__screen-value');

// Init screen value
let currentValue = 0;
refreshScreen();




/////////////////////////////
//  Helper functions
//

/**
 * Refresh our screen with current value
 */
function refreshScreen() {
  myScreen.value = currentValue;
}
