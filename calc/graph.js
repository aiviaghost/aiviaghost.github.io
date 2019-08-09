let graphInput = document.getElementById("graphInput");
graphInput.value = "ex. x^2 + 3x + 1";

//RegEx is bae
let regex = RegExp('(?:[0-9-+*/^()x]|abs|e\^x|ln|log|a?(?:sin|cos|tan)h?)+');

graphInput.addEventListener('focus', () => {
    if(!regex.test(graphInput.value)){
        graphInput.style.color = "#c48a73";
        graphInput.value = "";
    }
})

graphInput.addEventListener('blur', () => {
    if(graphInput.value == "" /*|| !regex.test(graphInput.value)*/){
        graphInput.style.color = "#b4b4b4";
        graphInput.value = "ex. x^2 + 3x + 1";
    }
})
