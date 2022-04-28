import { changeInnerText, showPlaylists, showSearch } from "./mp-ui.js"
import { accessTokenKey, getUsername, getCurrentPlaylists, nextItemsUrlKey, nextItemsTypeKey } from "./API.js"


setEventListeners()


function closeMenu(el) {
    el.dispatchEvent(new Event("click")); 
}


function setEventListeners() {
    const menuBtn = document.querySelector(".menu-button")
    const contentHeader = document.querySelector(".content-header")
    const contentContainerOpt = document.querySelector(".content-container-opt")
    const contentContainer = document.querySelector(".content-container")
    const accountBtn = document.querySelector(".menu-opt-button#account")
    const playlistsBtn = document.querySelector(".menu-opt-button#playlists")
    const searchBtn = document.querySelector(".menu-opt-button#search")
    const signOutBtn = document.querySelector(".menu-opt-button#sign-out")

    accountBtn.addEventListener("click", function() {
        closeMenu(menuBtn)
    })

    playlistsBtn.addEventListener("click", async function() {
        const headerText = await getUsername() + "'s " + playlistsBtn.innerText;
        const res = await getCurrentPlaylists();
        localStorage.setItem(nextItemsUrlKey, res[1])
        localStorage.setItem(nextItemsTypeKey, res[2])

        changeInnerText(contentHeader, headerText)
        closeMenu(menuBtn)
        showPlaylists(contentHeader, 
                      contentContainer,
                      contentContainerOpt,
                      "content-container-opt-hidden",
                      res[0])
    })

    searchBtn.addEventListener("click", function() {
        changeInnerText(contentHeader, searchBtn.innerText)
        closeMenu(menuBtn)
        showSearch(contentContainer, contentContainerOpt, "content-container-opt-hidden")
    })

    signOutBtn.addEventListener("click", function() {
        closeMenu(menuBtn)
        localStorage.removeItem(accessTokenKey)
    })
}