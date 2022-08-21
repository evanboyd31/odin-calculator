// HTML elements (buttons and display div of calculator)
const zeroButton = document.querySelector("#zero");
const oneButton = document.querySelector("#one");
const twoButton = document.querySelector("#two");
const threeButton = document.querySelector("#three");
const fourButton = document.querySelector("#four");
const fiveButton = document.querySelector("#five");
const sixButton = document.querySelector("#six");
const sevenButton = document.querySelector("#seven");
const eightButton = document.querySelector("#eight");
const nineButton = document.querySelector("#nine");
const addButton = document.querySelector("#add");
const subtractButton = document.querySelector("#subtract");
const multiplyButton = document.querySelector("#multiply");
const divideButton = document.querySelector("#divide");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#AC")
const deleteButton = document.querySelector("#backspace");
const plusMinusButton = document.querySelector("#plus-minus")
const decimalButton = document.querySelector("#decimal");
const displayDiv = document.querySelector(".display");

// global variables used for calculations
let firstDisplayNum = "0";
let secondDisplayNum;
let result;
let operator = ' ';

// event listeners for number buttons call updateDisplay method
zeroButton.addEventListener('click', updateDisplay);
oneButton.addEventListener('click', updateDisplay);
twoButton.addEventListener('click', updateDisplay);
threeButton.addEventListener('click', updateDisplay);
fourButton.addEventListener('click', updateDisplay);
fiveButton.addEventListener('click', updateDisplay);
sixButton.addEventListener('click', updateDisplay);
sevenButton.addEventListener('click', updateDisplay);
eightButton.addEventListener('click', updateDisplay);
nineButton.addEventListener('click', updateDisplay);

// operator buttons call operatorSelected method
addButton.addEventListener('click', operatorSelected);
subtractButton.addEventListener('click', operatorSelected);
multiplyButton.addEventListener('click', operatorSelected);
divideButton.addEventListener('click', operatorSelected);

// miscellaneous buttons call their respective methods
equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', backspace);
plusMinusButton.addEventListener('click', plusMinus);
decimalButton.addEventListener('click', addDecimal);

/*
updateDisplay is called whenever a number button is pressed.
It checks to see if an operator has been selected or not, and updates the display
and assigns values to firstDisplayNum and secondDisplayNum
*/
function updateDisplay(e) {
    // no operator selected, begin a new calculation
    if (operator === ' ') {
        if (displayDiv.textContent === "0" || Number(displayDiv.textContent) === result) {
            // the old result or zero is being displayed, so we can start writing new numbers in the display
            displayDiv.textContent = e.target.textContent;
        } else {
            // append digits onto the end of the display
            displayDiv.textContent += e.target.textContent;
        }
    }

    // an operator has been selected
    if (operator !== ' ' && secondDisplayNum === firstDisplayNum) {
        // the first number is still in the display, begin typing a new number
        displayDiv.textContent = e.target.textContent;
    } else if (operator !== ' ') {
        // there is a number other than the first number in the display
        if (displayDiv.textContent === "0") {
            // overwrite the zero in the display
            displayDiv.textContent = e.target.textContent;
        } else {
            // append digits onto the number in the display
            displayDiv.textContent += e.target.textContent;
        }
    }

    // operator has been selected, keep track of the second number
    if (operator !== ' ') {
        secondDisplayNum = Number(displayDiv.textContent);
    }
}

/*
operatorSelected is called whenever an operator button is clicked
*/
function operatorSelected(e) {
    // operator has not already been selected
    if (operator === ' ') {
        // get displayed value and put it in the first and second nums, store operator
        firstDisplayNum = Number(displayDiv.textContent);
        secondDisplayNum = firstDisplayNum;
        operator = e.target.textContent;
    } else {
        /*
         operator hasn't been picked yet
         evaluate the expression thus far, and store operator
        */
        evaluate(e);
        operator = e.target.textContent;
    }

}

/*
backspace is called whenever the DEL button is clicked
*/
function backspace(e) {
    // there is more than one digit in the display
    if (displayDiv.textContent.length !== 1) {
        // reduce by one digit
        displayDiv.textContent = displayDiv.textContent.slice(0, displayDiv.textContent.length - 1);
    } else {
        // only 1 digit in display, reset to zero
        displayDiv.textContent = "0";
    }

}

/*
plusMinus is called when the +/- button is clicked and toggles
the displayed number between positive and negative
*/
function plusMinus(e) {
    // get displayed text
    let currentDisplayText = displayDiv.textContent;
    if (currentDisplayText.charAt(0) !== '-') {
        // no negative sign, prepend a negative sign
        displayDiv.textContent = '-' + currentDisplayText;
    } else {
        // remove negative sign from string
        displayDiv.textContent = currentDisplayText.slice(1, currentDisplayText.length);
    }
}

/*
addDecimal adds a decimal to the displayed number if there isn't one already
there.
*/
function addDecimal(e) {
    // get displayed text
    let currentDisplayText = displayDiv.textContent;
    if (currentDisplayText.indexOf('.') === -1) {
        // no decimal is present in the number, append a decimal
        displayDiv.textContent += ".";
    }
}

/*
evaluate is called when the equals button has been hit, or there is more than
one operator being used in an expression.
*/
function evaluate(e) {
    if (operator === ' ') {
        // no operator selected, nothing to evaluate
        return;
    } else {
        // get the displayed number and store as the second number
        secondDisplayNum = Number(displayDiv.textContent);
        // call respective operation functions
        switch (operator) {
            case '+':
                result = add(firstDisplayNum, secondDisplayNum);
                break;
            case '-':
                result = subtract(firstDisplayNum, secondDisplayNum);
                break;
            case '*':
                result = multiply(firstDisplayNum, secondDisplayNum);
                break;
            case '/':
                // ensure no division by zero
                if (secondDisplayNum !== 0) {
                    result = divide(firstDisplayNum, secondDisplayNum);
                } else {
                    // division by zero warning
                    window.alert("You can't divide by zero!");
                    return;
                }
                break;
        }
        // the first and second operands are now the result
        firstDisplayNum = result;
        secondDisplayNum = firstDisplayNum;
        // reset operator
        operator = ' ';
        // round off to 2 decimal places, if necessary
        displayDiv.textContent = Math.round(result * 100) / 100;
    }
}
/*
clear is called whenever the AC button is clicked
reset the first, second, result, and display nums to zero
reset operator
*/
function clear() {
    firstDisplayNum = 0;
    secondDisplayNum = firstDisplayNum;
    result = 0;
    displayDiv.textContent = "0";
    operator = ' ';
}

/*
adds two numbers
*/
function add(num1, num2) {
    return num1 + num2;
}

/*
subtracts two numbers
*/
function subtract(num1, num2) {
    return num1 - num2;
}

/*
multiplies two numbers
*/
function multiply(num1, num2) {
    return num1 * num2;
}

/*
divides two numbers
*/
function divide(num1, num2) {
    return num1 / num2;
}

/*
operate looks at the operator and calls the respective operations function
with the two operands (num1 & num2)
*/
function operate(operator, num1, num2) {
    let result;
    switch (operator) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = subtract(num1, num2);
            break;
        case '*':
            result = multiply(num1, num2);
            break;
        case '/':
            result = divide(num1, num2);
            break;
        default:
            break;
    }
    return result;
}