let slider = document.getElementById("btnSlider");
let sp = document.getElementById("sidePanel");
let btnDown = false;

function isDown(){
    btnDown = true;
}

function isUp(){
    btnDown = false;
}

slider.addEventListener('mousedown', isDown);
document.addEventListener('mouseup', isUp);

document.addEventListener('mousemove', e => {
    let spWidth = sp.offsetWidth + e.movementX;
    if(btnDown && (spWidth + 17 <= window.innerWidth) && (spWidth >= 0.2 * window.innerWidth)){
        sp.style.width = spWidth + "px";
        slider.style.left = slider.offsetLeft + e.movementX + "px";
    }
});
