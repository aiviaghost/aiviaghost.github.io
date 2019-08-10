let graphInput = document.getElementById("graphInput");
graphInput.value = "ex. x^2 + 3x + 1";

//RegEx is bae
let regex = RegExp('[^0-9x+\\-*/^() ]');

graphInput.addEventListener('focus', () => {
    graphInput.style.color = "#c48a73";
    if(regex.test(graphInput.value)){
        graphInput.value = "";
    }
})

graphInput.addEventListener('blur', () => {
    if(graphInput.value == "" /*|| regex.test(graphInput.value)*/){
        graphInput.style.color = "#b4b4b4";
        graphInput.value = "ex. x^2 + 3x + 1";
    }
})
