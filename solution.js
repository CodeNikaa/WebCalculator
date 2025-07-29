const display = document.getElementById('display');
let currentInput = '';
let previousInput = '';
let operator = null;
let resultDisplayed = false;

// Updates Display everytime something input was made
function updateDisplay(value) {
  display.textContent = value;
}

// Evaluates/Calculates 

function evaluate(num1, num2, op) {
  switch (op) {
    case '+': return num1 + num2;
    case '-': return num1 - num2;
    case '*': return num1 * num2;
    case '/': return num2 !== 0 ? num1 / num2 : 'Error';
    default: return 'Invalid';
  }
}

function handleInput(value) {

  switch (value) {
    // Numbers and decimal
    case '0': case '1': case '2': case '3': case '4':
    case '5': case '6': case '7': case '8': case '9': case '.':
      if (resultDisplayed) {
        currentInput = value;
        resultDisplayed = false;
      } else {
        currentInput += value;
      }
      updateDisplay(currentInput);
      break;

    // Operators
    case '+': case '-': case '*': case '/':
      if (currentInput === '') return;
      if (currentInput !== "") {
        previousInput = currentInput;
      } else {
        previousInput = evaluate(parseFloat(previousInput), parseFloat(currentInput), operator);
      }
      operator = value;
      currentInput = '';
      updateDisplay(previousInput + ' ' + operator);
      break;

    // Equals
    case '=': case 'Enter':
      if (previousInput && currentInput && operator) {
        const result = evaluate(parseFloat(previousInput), parseFloat(currentInput), operator);
        updateDisplay(result);
        currentInput = result.toString();
        previousInput = '';
        operator = null;
        resultDisplayed = true;
      }
      break;

    // Backspace
    case 'Backspace':
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput);
      break;

    // Clear
    case 'Clear': case 'Es':
      currentInput = '';
      previousInput = '';
      operator = null;
      resultDisplayed = false;
      updateDisplay('');
      break;

    default:
      // ignore invalid keys
      break;
  }
}

// Mouse input
document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.key;
    handleInput(value);
  });
});

// Keyboard input
document.addEventListener('keydown', e => {
  handleInput(e.key);
});
