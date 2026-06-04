let bgImage = document.getElementById("bgImage");
let myImage = document.getElementById("myImage");

let clouds = document.querySelectorAll(".cloudImage");

let bgAccelerator = -0.1;
let myAccelerator = 0.02;

window.addEventListener("mousemove", (e) => {
    let posX = e.clientX - window.innerWidth / 2;
    let posY = e.clientY - window.innerHeight / 2;
    bgImage.style.objectPosition = `calc(50% + ${posX * bgAccelerator}px) calc(50% + ${posY * bgAccelerator}px)`;
    myImage.style.objectPosition = `calc(50% + ${posX * myAccelerator}px) calc(50% + ${posY * myAccelerator + 75}px)`;

    for (let i = 0; i < clouds.length; i++) {
        const element = clouds[i];
        let cloudAccelerator = element.getAttribute("data-accelerate");
        element.style = `transform: translate(calc(-50% - ${posX * cloudAccelerator}px), calc(-50% - ${posY * cloudAccelerator}px));`;
    }
});

let clickMeMessage = document.querySelector(".click-me-message");

function clickMe() {
    clickMeMessage.classList.toggle("opacity0");
}
