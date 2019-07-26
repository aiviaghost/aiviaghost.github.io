/*
* Creates a typewriter effect for the header
* The effect begins 500ms after the page has loaded fully
* Then the string is typed one letter at a time, 150ms between each letter
*/
function waitUntilThePageIsFullyLoadedThenDisplayTheText(){
    setTimeout(typewriter, 500);
}

let header = "Aiviaghost";
let x = 0;
function typewriter(){
    if(x < header.length){
        document.getElementById("wack").textContent += header.charAt(x);
        document.getElementById("wack2").textContent += header.charAt(x);
        x++;
        setTimeout(typewriter, 150);
    }
}
window.addEventListener('load', waitUntilThePageIsFullyLoadedThenDisplayTheText);


/*
* This code creates the ability to change the background image by using the slider
* It registers the mousemovement and applies it to the width of the "overlay"
*/
let slider = document.getElementById("btnSlider");
let sp = document.getElementById("overlay");
let btnDown = false;

function isDown(){
    btnDown = true;
    document.getElementById("overlay").style.cursor = "grabbing";
    document.getElementById("backdrop").style.cursor = "grabbing";
}

function isUp(){
    btnDown = false;
    document.getElementById("overlay").style.cursor = "default";
    document.getElementById("backdrop").style.cursor = "default";
}

slider.addEventListener('mousedown', isDown);
document.addEventListener('mouseup', isUp);

document.addEventListener('mousemove', e => {
    let spWidth = sp.offsetWidth + e.movementX;
    if(btnDown && (spWidth + 17 <= window.innerWidth) && (spWidth >= 10)){
        sp.style.width = spWidth + "px";
        slider.style.left = slider.offsetLeft + e.movementX + "px";
    }
});


/* 
* This code sets a randomized color as the primary color of the webpage
* It creates a hexcode by picking 6 characters from a list of 16 characters
* The string generated is assigned to the custom property "--spColor"
*/
let hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e","f"];
let hexcode = "#";
for(let x = 0; x < 6; x++){
    let rand = Math.floor(Math.random()*16);
    hexcode += hex[rand];
}
document.documentElement.style.setProperty('--spColor', hexcode);
