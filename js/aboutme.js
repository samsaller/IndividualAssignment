let Burger = document.querySelector(".burger")
let Nav = document.querySelector("nav")
let Main = document.querySelector("main")

Burger.addEventListener("click", e=>{
    Burger.classList.toggle("active")
    Nav.classList.toggle("active")
    Main.classList.toggle("active")
})