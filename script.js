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
        document.getElementById("wack1").textContent += header.charAt(x);
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
    if(btnDown && (spWidth + 17 <= window.innerWidth) && (spWidth >= 5)){
        sp.style.width = spWidth + "px";
        slider.style.left = slider.offsetLeft + e.movementX + "px";
    }
});


/* 
* This code sets a randomized color as the primary color of the webpage
* It creates a hexcode by picking 6 characters from a list of 16 characters
* The string generated is assigned to the custom property "--spColor"
* A complimentary color is picked for the backgrounds of the ".site" elements
* The complimentary color is calculated by picking a number via the formula:
* 15 - (char in "hexcode1") = (new char for "hexcode2")
*/
let hex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e","f"];
let hexcode1 = "#";
for(let x = 0; x < 6; x++){
    let rand = Math.floor(Math.random()*16);
    hexcode1 += hex[rand];
}
document.documentElement.style.setProperty('--spColor', hexcode1);

let hexcode2 = "#";
for(let j = 1; j < 7; j++){
    hexcode2 += convert(15 - convert(hexcode1.charAt(j)));
}
let sites = document.getElementsByClassName("site");
for(let k = 0; k < sites.length; k++){
    sites[k].style.backgroundColor = hexcode2;
}

function convert(c){
    switch(c){
        case "a":
            return 10;
        case 10:
            return "a";
        case "b":
            return 11;
        case 11:
            return "b";
        case "c":
            return 12;
        case 12:
            return "c";
        case "d":
            return 13;
        case 13:
            return "d";
        case "e":
            return 14;
        case 14:
            return "e";
        case "f":
            return 15;
        case 15:
            return "f";
        default:
            return c;
    }
}

/*
* This code sets color of the text on elements with the class "site"
* This is done by calculating the contrast between the background color and the text color
* If the contrast is 4:1 or greater then the text color is set to white otherwise it is set to black
*/
function brightness(hexcode){
    let r = sRGB(hexcode.substr(1, 2)) / 255.0;
    r = (r <= 0.03928) ? r/12.92 : Math.pow(((r + 0.055) / 1.055), 2.4);

    let g = sRGB(hexcode.substr(3, 2)) / 255.0;
    g = (g <= 0.03928) ? g/12.92 : Math.pow(((g + 0.055) / 1.055), 2.4);

    let b = sRGB(hexcode.substr(5, 2)) / 255.0;
    b = (b <= 0.03928) ? b/12.92 : Math.pow(((b + 0.055) / 1.055), 2.4);

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function sRGB(hex){
    return parseInt(hex, 16);
}

let lumA = brightness("#ffffff");
let lumB = brightness(hexcode2);
let color = ((Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05)) > 3 ? "white" : "black";

console.log(brightness("#ffffff"));
console.log(brightness(hexcode2));
console.log((brightness("#ffffff") + 0.05) / (brightness(hexcode2) + 0.05));

for(let k = 0; k < sites.length; k++){
    sites[k].style.color = color;
}
