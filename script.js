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
const displayDiv = document.querySelector(".display");

let firstDisplayNum = "0";
let secondDisplayNum;
let result;
let operator = ' ';
const errorString = "Error";


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

// operator buttons
addButton.addEventListener('click', operatorSelected);
subtractButton.addEventListener('click', operatorSelected);
multiplyButton.addEventListener('click', operatorSelected);
divideButton.addEventListener('click', operatorSelected);

equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', backspace);

function updateDisplay(e) {

    if (operator === ' ') {
        if (displayDiv.textContent === "0") {
            displayDiv.textContent = e.target.textContent;
        } else {
            displayDiv.textContent += e.target.textContent;
        }
    }

    if (operator !== ' ' && secondDisplayNum === firstDisplayNum) {
        displayDiv.textContent = e.target.textContent;
    } else if (operator !== ' ') {
        if (displayDiv.textContent === "0") {
            displayDiv.textContent = e.target.textContent;
        } else {
            displayDiv.textContent += e.target.textContent;
        }
    }

    if (operator === ' ') {
        firstDisplayNum = 0;
    } else {
        secondDisplayNum = Number(displayDiv.textContent);
    }
}

function operatorSelected(e) {
    if (operator === ' ') {
        firstDisplayNum = Number(displayDiv.textContent);
        secondDisplayNum = firstDisplayNum;
        operator = e.target.textContent;
    } else {
        evaluate(e);
        operator = e.target.textContent;
    }

}

function backspace(e) {
    displayDiv.textContent = displayDiv.textContent.slice(0, displayDiv.textContent.length - 1);
}

function evaluate(e) {
    if (operator === ' ') {
        return;
    } else {
        secondDisplayNum = Number(displayDiv.textContent);
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
                if (secondDisplayNum !== 0) {
                    result = divide(firstDisplayNum, secondDisplayNum);
                } else {
                    window.alert("You can't divide by zero!");
                    return;
                }
                break;
        }

        firstDisplayNum = result;
        secondDisplayNum = firstDisplayNum;
        operator = ' ';
        displayDiv.textContent = result;
    }
}

function clear() {
    firstDisplayNum = 0;
    secondDisplayNum = firstDisplayNum;
    result = 0;
    displayDiv.textContent = "0";
    operator = ' ';
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

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