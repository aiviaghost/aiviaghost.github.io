let expression = document.getElementById("expression");
let numbers = document.getElementById("numbers");
for(let i = 0; i < numbers.childElementCount; i++){
    let button = numbers.children[i];
    button.addEventListener("pointerdown", () => {
        let value = button.textContent;
        if(value != "." && value != "="){
            expression.value += value;
        }
    })
}
