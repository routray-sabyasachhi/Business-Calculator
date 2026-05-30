const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const operators = ["+", "-", "*", "/"];

function appendValue(value) {
    const lastCharacter = display.value.slice(-1);

    if (operators.includes(value) && operators.includes(lastCharacter)) {
        display.value = display.value.slice(0, -1) + value;
        return;
    }

    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    if(display.value === "Error")
        clearDisplay();
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    try {
        const expression = display.value;

        if (!expression || /[^0-9+\-*/.]/.test(expression)) {
            return;
        }

        display.value = Function(`"use strict"; return (${expression})`)();
    } catch {
        display.value = "Error";
    }
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const { action, value } = button.dataset;

        if (action === "clear") {
            clearDisplay();
        } else if (action === "delete") {
            deleteLast();
        } else if (action === "calculate") {
            calculateResult();
        } else {
            appendValue(value);
        }
    });
});
