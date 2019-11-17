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

function evaluateExpression() {
    // evaluate expression and display result
}

/*
* enable horizontal scrolling but disable normal keyboard input 
* https://stackoverflow.com/questions/8308096/how-to-make-html-text-field-readonly-but-also-scrollable
*/
var readOnlyInputs = document.querySelectorAll('input[readonly]');
function readOnlyClickHandler() {
    this.removeAttribute('readonly');
}
function readOnlyBlurHandler() {
    this.setAttribute('readonly');
}
function readOnlyKeypressHandler(event) {
    event.preventDefault();
}
document.addEventListener('load', function () {
    for (var i = 0; i < readOnlyInputs.length; i++) {
        readOnlyInputs[i].classList.add('readonly');
        // Add the functions to the events
        readOnlyInputs[i].addEventListener('click', readOnlyClickHandler);
        readOnlyInputs[i].addEventListener('blur', readOnlyBlurHandler);
        readOnlyInputs[i].addEventListener('keypress', readOnlyKeypressHandler);
    }
});
