import { changeStyle } from "./main.js"

setEventListeners()

function setEventListeners() {
    const menu = document.querySelector(".side-menu")
    const menuBtn = document.querySelector(".menu-button")
    menuBtn.addEventListener("click", function() {
        changeStyle(menu, "side-menu-hidden")
        changeStyle(menuBtn, "menu-button-selected")
    }) 
}