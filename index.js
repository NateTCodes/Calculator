function add(a, b) {
    return a + b;
}

function subtract(a, b) {    
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error('Cannot divide by zero');
    }
    const result = a / b;
    if (!Number.isInteger(result)) {
        return result.toFixed(5); 
    }else{
        return result;
    }
}

function modulo(a, b) {
    return a % b;
}

const operators = ['+', '-', 'x', '÷', '%'];

function calculate(a, b, operator) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        case '%':
            return modulo(a, b);
    }
}

let currentNumber = '';
let previousNumber = '';
let currentOperator = '';

function appendNumber(value) {
    currentNumber += value;
    updateDisplay(currentNumber);
}

function updateDisplay(value) {
    document.querySelector('#display').textContent = value;
}

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.textContent);
    });
});

document.querySelector('#percent').addEventListener('click', () => {
    const value = parseFloat(currentNumber) / 100;
    updateDisplay(value.toString());
    currentNumber = value.toString();
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        if (currentNumber === '') return; 
        if (previousNumber !== '') {
            currentNumber = calculate(parseFloat(previousNumber), parseFloat(currentNumber), currentOperator).toString();
            updateDisplay(currentNumber);
        }
        currentOperator = button.textContent;
        previousNumber = currentNumber;
        currentNumber = '';
    });
});

document.querySelector('#equals').addEventListener('click', () => {
    if (currentNumber === '' || previousNumber === '' || currentOperator === '') return;  // Ignore if incomplete
    const result = calculate(parseFloat(previousNumber), parseFloat(currentNumber), currentOperator);
    updateDisplay(result);
    previousNumber = '';
    currentNumber = result.toString();
    currentOperator = '';
});

document.querySelector('#clear').addEventListener('click', () => {
    currentNumber = '';
    previousNumber = '';
    currentOperator = '';
    updateDisplay('0');
});

document.querySelector('#sign').addEventListener('click', () => {
    if (currentNumber !== '') {
        currentNumber = (parseFloat(currentNumber) * -1).toString();
        updateDisplay(currentNumber);
    }
});

document.querySelector('#decimal').addEventListener('click', () => {
    if (!currentNumber.includes('.')) {
        currentNumber += '. ';
        updateDisplay(currentNumber);
    }
});
function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}`;
}

setInterval(updateTime, 1000);
updateTime(); 