import { showHideMenu } from "./main.js"


setEventListeners()


function setEventListeners() {
    const menu = document.querySelector(".side-menu")
    const menuBtn = document.querySelector(".menu-button")
    menuBtn.addEventListener("click", function() {
        showHideMenu(menu, "side-menu-hidden");
        showHideMenu(menuBtn, "menu-button-selected");
    }) 
}