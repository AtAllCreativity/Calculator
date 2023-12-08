document.addEventListener('DOMContentLoaded', function() {
    const calculatorScreen = document.querySelector('.calculator-screen h2');
    const calculatorOperation = document.querySelector('.calculator-operation p');
    const numberBtn = document.querySelectorAll('.btn-number');
    const operatorBtns = document.querySelectorAll('.btn-operator');
    const ceBtn = document.querySelector('.btn-ce');
    const equalBtn = document.querySelector('.btn-equal');

    let currentNumber = '';
    let storedNumber = '';  // Added variable to store the previously entered number
    let currentOperator = '';

    function btnClick(event) {
        const clickedNumber = event.target.textContent;
        currentNumber += clickedNumber;
        calculatorScreen.textContent += clickedNumber;
    }

    numberBtn.forEach(function (button) {
        button.addEventListener('click', btnClick);
    });

    operatorBtns.forEach(function (button) {
        button.addEventListener('click', function (event) {
            if (currentNumber !== '') {
                if (storedNumber !== '') {
                    // If there is a stored number, add the current number to it
                    storedNumber = performCalculation(storedNumber, currentNumber, currentOperator);
                } else {
                    // If there is no stored number, save the current number
                    storedNumber = currentNumber;
                }

                currentOperator = event.target.textContent;
                calculatorOperation.textContent = storedNumber + ' ' + currentOperator;
                calculatorScreen.textContent = '';
                currentNumber = '';
            }
        });
    });

    function handleCEButtonClick() {
        currentNumber = '';
        storedNumber = '';
        currentOperator = '';
        calculatorScreen.textContent = '';
        calculatorOperation.textContent = '';
    }

    ceBtn.addEventListener('click', handleCEButtonClick);

    function handleEqualButtonClick() {
        if (currentNumber !== '' && currentOperator !== '') {
            storedNumber = performCalculation(storedNumber, currentNumber, currentOperator);
            calculatorScreen.textContent = storedNumber;
            calculatorOperation.textContent = '';
            currentNumber = storedNumber.toString();
            storedNumber = '';
            currentOperator = '';
        }
    }

    equalBtn.addEventListener('click', handleEqualButtonClick);

    function performCalculation(num1, num2, operator) {
        switch (operator) {
            case '+':
                return parseFloat(num1) + parseFloat(num2);
            case '-':
                return parseFloat(num1) - parseFloat(num2);
            case 'x':
                return parseFloat(num1) * parseFloat(num2);
            case '÷':
                return parseFloat(num1) / parseFloat(num2);
            default:
                return 'Error';
        }
    }
});
