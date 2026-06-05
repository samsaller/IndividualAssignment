let BgImage = document.getElementById("bgImage");
let MyImage = document.getElementById("myImage");

let Clouds = document.querySelectorAll(".cloudImage");

let BgAccelerator = -0.1;
let MyAccelerator = 0.02;

window.addEventListener("mousemove", (e) => {
    let PosX = e.clientX - window.innerWidth / 2;
    let PosY = e.clientY - window.innerHeight / 2;
    BgImage.style.objectPosition = `calc(50% + ${PosX * BgAccelerator}px) calc(50% + ${PosY * BgAccelerator}px)`;
    MyImage.style.objectPosition = `calc(50% + ${PosX * MyAccelerator}px) calc(50% + ${PosY * MyAccelerator + 75}px)`;

    for (let i = 0; i < Clouds.length; i++) {
        const Element = Clouds[i];
        let CloudAccelerator = Element.getAttribute("data-accelerate");
        Element.style = `transform: translate(calc(-50% - ${PosX * CloudAccelerator}px), calc(-50% - ${PosY * CloudAccelerator}px));`;
    }
});

let ClickMeMessage = document.querySelector(".click-me-message");
function clickMe() {
    ClickMeMessage.classList.toggle("opacity0");
}
