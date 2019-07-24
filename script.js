let header = "Aiviaghost";
let x = 0;
let speedz = 150;

function typewriter(){
    if(x < header.length){
        document.getElementById("wack").innerHTML += header.charAt(x);
        document.getElementById("wack2").innerHTML += header.charAt(x);
        x++;
        setTimeout(typewriter, speedz);
    }
}
window.addEventListener('load', typewriter);


let slider = document.getElementById("btnSlider");
let sp = document.getElementById("sidePanel");
let btnDown = false;

function isDown(){
    btnDown = true;
    document.getElementById("sidePanel").style.cursor = "grabbing";  //Might replace with querySelectorAll
    document.getElementById("backdrop").style.cursor = "grabbing";
}

function isUp(){
    btnDown = false;
    document.getElementById("sidePanel").style.cursor = "default";
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
