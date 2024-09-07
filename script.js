"use strict";

class Calculator {
    constructor(previousOperandEl, currentOperandEl) {
        this.previousOperandEl = previousOperandEl;
        this.currentOperandEl = currentOperandEl;
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = null;
    }
    input(number) {
        if (number === "." && this.currentOperand.includes(".")) return;
        if (number === "." && this.currentOperand === "") {
            this.currentOperand = "0";
        }
        if (number !== "." && this.currentOperand === "0") {
            this.currentOperand = "";
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    reset() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = null;
    }

    backspace() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    setOperation(operation) {
        if (this.currentOperand === "") {
            this.previousOperand = "0";
            this.operation = operation;
            return;
        }
        if (this.previousOperand !== "") {
            this.calculate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    calculate() {
        let result;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case "+":
                result = prev + current;
                break;
            case "-":
                result = prev - current;
                break;
            case "*":
                result = prev * current;
                break;
            case "÷":
                result = prev / current;
                break;
            case "%":
                result = (current / 100) * prev;
                break;
            default:
                return;
        }
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = "";
    }
    render() {
        let isCurrentOperandExponential = +this.currentOperand > 999999999999998;
        let isPreviousOperandExponential = +this.previousOperand > 999999999999998;
        this.currentOperandEl.innerText = isCurrentOperandExponential
            ? String((+this.currentOperand).toExponential())
            : this.currentOperand;
        if (this.operation != null) {
            this.previousOperandEl.innerText = `${
                isPreviousOperandExponential
                    ? String((+this.previousOperand).toExponential())
                    : this.previousOperand
            } ${this.operation}`;
        } else {
            this.previousOperandEl.innerText = "";
        }
    }
}

let numberButtons = document.querySelectorAll("#number");
let operationButtons = document.querySelectorAll("#operation");
let equalsButton = document.getElementById("equals");
let backspaceButton = document.getElementById("backspace");
let resetButton = document.getElementById("reset");
let previousOperandEl = document.getElementById("previous-operand");
let currentOperandEl = document.getElementById("current-operand");

let calc = new Calculator(previousOperandEl, currentOperandEl);

numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calc.input(button.innerText);
        calc.render();
    });
});

operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
        calc.setOperation(button.innerText);
        calc.render();
    });
});

equalsButton.addEventListener("click", (button) => {
    calc.calculate();
    calc.render();
});

resetButton.addEventListener("click", (button) => {
    calc.reset();
    calc.render();
});

backspaceButton.addEventListener("click", (button) => {
    calc.backspace();
    calc.render();
});
