let container = document.getElementById("container");
let nav = document.getElementById("nav");
let header1 = document.getElementById("pico2019");
let darkBody = "#202124";
let darkContainer = "#262729";

["load", "resize"].forEach(e => {
    window.addEventListener(e, () => {
        //container.style.left = (window.innerWidth - container.offsetWidth)/2 + "px";
        nav.style.left = container.offsetLeft + "px";
        header1.style.lineHeight = nav.offsetHeight + "px";
        startImage.style.height = (720 * startImage.offsetWidth) / 1280 + "px";
    })
})

window.addEventListener("scroll", () => {
    if(window.scrollY > 0){
        nav.style.backgroundColor = "#353535";
    }
    else{
        nav.style.backgroundColor = darkContainer;
    }
})
