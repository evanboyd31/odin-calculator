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
const displayDiv = document.querySelector(".display");

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


function updateDisplay(e) {
    if (displayDiv.textContent === "0") {
        displayDiv.textContent = e.target.textContent;
    } else {
        displayDiv.textContent += e.target.textContent;
    }
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