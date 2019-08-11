/*
* This code validates the user input for the graph
*/
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

/*
* This code implements the ability to resize the width of the "controls"
*/
let controls = document.getElementById("controls");
let slider = document.getElementById("slider");
let btnPressed = false;

slider.addEventListener('mousedown', () => btnPressed = true);

document.addEventListener('mouseup', () => btnPressed = false);

document.addEventListener('mousemove', e => {
    let controlsWidth = controls.offsetWidth + e.movementX;
    if(btnPressed && (controlsWidth >= 0.2 * window.innerWidth) && (controlsWidth <= window.innerWidth)){
        controls.style.width = controlsWidth + "px";
        slider.style.left = slider.offsetLeft + e.movementX + "px";
    }
})
