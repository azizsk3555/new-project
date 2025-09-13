let display = document.getElementById('result');
let currentInput = '';
let operator = '';
let previousInput = '';
let shouldResetDisplay = false;

// Function to update the display
function updateDisplay(value) {
    display.value = value;
}

// Function to append numbers and operators to display
function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentInput = '';
        shouldResetDisplay = false;
    }
    
    // Handle decimal point
    if (value === '.' && currentInput.includes('.')) {
        return;
    }
    
    // Handle operators
    if (['+', '-', '*', '/'].includes(value)) {
        if (currentInput === '' && previousInput === '') {
            return;
        }
        
        if (currentInput === '' && previousInput !== '') {
            operator = value;
            return;
        }
        
        if (previousInput !== '' && currentInput !== '' && operator !== '') {
            calculate();
        }
        
        operator = value;
        previousInput = currentInput;
        currentInput = '';
        return;
    }
    
    currentInput += value;
    updateDisplay(currentInput);
}

// Function to calculate the result
function calculate() {
    if (previousInput === '' || currentInput === '' || operator === '') {
        return;
    }
    
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;
    
    try {
        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    updateDisplay('Error');
                    resetCalculator();
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }
        
        // Round to avoid floating point precision issues
        result = Math.round(result * 100000000) / 100000000;
        
        updateDisplay(result.toString());
        currentInput = result.toString();
        previousInput = '';
        operator = '';
        shouldResetDisplay = true;
        
    } catch (error) {
        updateDisplay('Error');
        resetCalculator();
    }
}

// Function to clear the display
function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    shouldResetDisplay = false;
    updateDisplay('');
}

// Function to delete the last character
function deleteLast() {
    if (currentInput.length > 0) {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput);
    }
}

// Function to reset calculator state
function resetCalculator() {
    currentInput = '';
    previousInput = '';
    operator = '';
    shouldResetDisplay = false;
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // Numbers and decimal point
    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
    }
    
    // Operators
    else if (['+', '-', '*', '/'].includes(key)) {
        appendToDisplay(key);
    }
    
    // Enter or equals
    else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    }
    
    // Escape or clear
    else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    }
    
    // Backspace
    else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }
});

// Initialize display
updateDisplay('');
