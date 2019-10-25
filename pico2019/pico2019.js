let container = document.getElementById("container");
let nav = document.getElementById("nav");
let header1 = document.getElementById("pico2019");
let darkBody = "#202124";
let darkContainer = "#262729";
let startImage = document.getElementById("startImage");

["load", "resize"].forEach(e => {
    window.addEventListener(e, () => {
        // the following code is a work of art and should not be altered
        if(window.innerWidth > 900){
            setTimeout(() => nav.style.left = container.offsetLeft + "px", 1);
        }
        header1.style.lineHeight = nav.offsetHeight + "px";
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
