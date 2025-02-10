'use strict';

const bill = document.querySelector('.bill');
const numberOfPeople = document.querySelector('.numberOfPeople');
const custom = document.querySelector('.custom');
const resetBtn = document.querySelector('.resetbtn');

const resultDisplay1 = document.getElementById('tipAmount');
const resultDisplay2 = document.getElementById('total');

resultDisplay1.textContent = '$0.00';
resultDisplay2.textContent = '$0.00';

// Reset fields and result displays
const resetFields = () => {
    bill.value = '';
    numberOfPeople.value = '';
    custom.value = '';
    document.querySelector('.resetbtn').style.backgroundColor = 'hsl(184, 14%, 56%)';
};

// Validate inputs before calculating
const validateInputs = () => {
    const billAmount = parseFloat(bill.value);
    const numberOfPeopleValue = parseInt(numberOfPeople.value);

    // Bill and number of people must be greater than 0 for valid calculations
    if (isNaN(billAmount) || billAmount <= 0 || isNaN(numberOfPeopleValue) || numberOfPeopleValue <= 0) {
        return false;
    }
    return true;
};

// Calculate and update the result
const updateResults = (tipPercentage = 0) => {
    const billAmount = parseFloat(bill.value);
    const numberOfPeopleValue = parseInt(numberOfPeople.value);
    const customTip = parseFloat(custom.value) || 0; // Handle empty or invalid custom tip input
    
    // Apply custom tip if valid, otherwise fallback to 15%
    const tipAmount = customTip > 0 ? billAmount * (customTip / 100) : billAmount * tipPercentage;
    const totalAmount = billAmount + tipAmount;

    // Ensure number of people is valid, fallback to 1 if not
    const people = numberOfPeopleValue > 0 ? numberOfPeopleValue : 1;

    const tipAmountPerPerson = tipAmount / people;
    const totalPerPerson = totalAmount / people;

    if(tipAmountPerPerson > 0 || totalPerPerson > 0){
        document.querySelector('.resetbtn').style.backgroundColor = 'hsl(172, 67%, 45%)';
    }else{
        document.querySelector('.resetbtn').style.backgroundColor = 'hsl(184, 14%, 56%)';
    }

    // Update result displays
    resultDisplay1.textContent = `$${tipAmountPerPerson.toFixed(2)}`;
    resultDisplay2.textContent = `$${totalPerPerson.toFixed(2)}`;
};

// Event listeners for input changes
bill.addEventListener('input', () => {
    if (validateInputs()) {
        updateResults();
    } else {
        //initializeResults();
    }
});

numberOfPeople.addEventListener('input', () => {
    if (validateInputs()) {
        updateResults();
    } else {
        //initializeResults();
    }
});

custom.addEventListener('input', () => {
    if (validateInputs()) {
        // Use the custom value or default to 15% if empty or invalid
        updateResults(parseFloat(custom.value) || 0);
    } else {
        //initializeResults();
    }
});

// Button click event listeners for quick tip percentages
const buttons = document.querySelectorAll('.Btn');
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const dataOption = parseFloat(btn.dataset.option);
        if (validateInputs()) {
            updateResults(dataOption);
        } else {
            //initializeResults();
        }
    });
});

// Reset button functionality
resetBtn.addEventListener('click', resetFields);

