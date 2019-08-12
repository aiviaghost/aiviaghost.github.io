/*
* This code validates the user input for the graph
*/
let graphInput = document.getElementById("graphInput");
let errorSymbol = document.getElementById("warning");
graphInput.value = "ex. x^2 + 3x + 1";

//RegEx is bae
let regex = RegExp('[^0-9.x+\\-*/^() ]');

graphInput.addEventListener('focus', () => {
    graphInput.style.borderColor = "#027acc";
    graphInput.style.color = "#c48a73";
    errorSymbol.style.display = "none";
})

graphInput.addEventListener('blur', () => {
    if(graphInput.value == ""){
        graphInput.style.color = "#b4b4b4";
        graphInput.value = "ex. x^2 + 3x + 1";
    }
    else if(regex.test(graphInput.value)){
        graphInput.style.borderColor = "red";
        errorSymbol.style.display = "block";
    }
})


/*
* This code implements the ability to resize the width of the "controls"
*/
let controls = document.getElementById("controls");
let slider = document.getElementById("slider");
let mouseActive = false;

slider.addEventListener('mousedown', () => mouseActive = true);

document.addEventListener('mouseup', () => mouseActive = false);

document.addEventListener('mousemove', e => {
    let controlsWidth = controls.offsetWidth + e.movementX;
    if(mouseActive && (controlsWidth >= 0.2 * window.innerWidth) && (controlsWidth <= 0.9 * window.innerWidth)){
        controls.style.width = controlsWidth + "px";
        slider.style.left = (slider.offsetLeft + e.movementX) + "px";
        errorSymbol.style.left = 0.1 * window.innerWidth + ((controls.offsetWidth - 0.1 * window.innerWidth) / 2) + "px";
    }
})
