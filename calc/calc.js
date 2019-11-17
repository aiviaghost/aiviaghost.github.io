let expression = document.getElementById("expression");
let numbers = document.getElementById("numbers");
let operators = document.getElementById("operators");

// enable buttons for numbers
for (let i = 0; i < numbers.childElementCount - 1; i++) {
    numbers.children[i].addEventListener("pointerdown", () => {
        expression.value += numbers.children[i].textContent;
        evaluateExpression();
    })
}

// enable buttons for operators
for (let i = 1; i < operators.childElementCount; i++) {
    operators.children[i].addEventListener("pointerdown", () => {
        expression.value += operators.children[i].textContent;
        evaluateExpression();
    })
}

// enable the "=" button
numbers.children[11].addEventListener("pointerdown", evaluateExpression)

// enable the "clear" / "C" button
operators.children[0].addEventListener("pointerdown", () => expression.value = "")

function evaluateExpression(){
    // evaluate expression and display result
}
