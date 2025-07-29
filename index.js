const display = document.getElementById("display");
let currentInput = "";
let previousInput = "";
let operator = null;
let resultDisplayed = false;

// updates the display everytime something gets typed
function updateDisplay (value) {
    display.textContent = value;
}

// evaluating/calculating
function calculate (num1, num2, op) {
    switch (op) {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num2 !== 0 ? num1 / num2 : "error";
        default: return "Invalid";
    }
}

// handle all the various inputs not controls
function handleInput(value) {

    switch(value) {

        // looking for the numbers/decimals
        case '1': case '2': case '3': case '4': case '5': case '6':
        case '7': case '8': case '9': case '0': case '.':
            if(resultDisplayed) {
                currentInput = value;
                resultDisplayed = false;
            } else {
                currentInput += value;
            }
            updateDisplay(currentInput);
            break;
        
        // looking for operators like '+' '-' '*' '/'
        case '+': case '-': case '/': case '*':
            if(currentInput === "") return;
            if(currentInput !== "") {
                previousInput = currentInput;
            } else {
                previousInput = calculate(parseFloat(currentInput), parseFloat(previousInput), operator);
            }
            operator = value;
            currentInput = "";
            updateDisplay(previousInput + " " + operator);
            break;

        // looking for "=" or "Enter" to Evaluate the process
        case '=': case "Enter":
            if(currentInput && previousInput && operator) {
                const result = calculate(parseFloat(currentInput), parseFloat(previousInput), operator);
                updateDisplay(result);
                currentInput = result.toString();
                currentInput = "";
                operator = null;
                resultDisplayed = true;
                break;
            }

        // making "Backspace" able to delete the last character typed to correct input
        case "Backspace" :
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput);
            break;

        // giving AC functionality
        case "Escape":
            currentInput = "";
            previousInput = "";
            operator = null;
            resultDisplayed = false;
            updateDisplay(currentInput);
            break;

        // not really necessary but still
        default: 
            // ignore invalid keys
            break;
        }
}

// enables mouse input
document.querySelectorAll(".buttons").forEach(button => {
    document,addEventListener("click", () => {
        const value = button.dataset.key;
        handleInput(value);
    })
})

// enables keyboard input
document.addEventListener("keydown", (e) => {
    handleInput(e.key);
})