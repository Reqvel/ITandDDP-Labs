import { showEl, hideEl } from "./main.js"
import { accessTokenKey, getUsername, getCurrentPlaylists } from "./API.js"
import { changeInnerText, showPlaylists, showTracks } from "./mp-ui.js"


setEventListeners()


function setTrackListener() {
    for(const el of playlists) {
        el.addEventListener("click", function() {
            // TODO
            console.log("Track Click!")
        })
    }
}


function showSearch(contentContainer, optContainer, optContainerClassname) {
    // TODO
    showEl(optContainer, optContainerClassname)
    optContainer.innerHTML = 
    `
    <div class="search-container appear-animation">
        <input class="text input-field input-field-mp-search " type="text" placeholder="Track Name..." required>
        <button class="text input-button input-button-pm-search">
            Search
        </button>
    </div>
    `

    const searchField = document.querySelector(".input-field-mp-search")
    const searchBtn = document.querySelector(".input-button-pm-search")

    searchBtn.addEventListener("click", function() {
        // TODO
        console.log("Search Click!")
    })

    showTracks(contentContainer)
}


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
        // TODO
    })

    playlistsBtn.addEventListener("click", async function() {
        const headerText = await getUsername() + "'s " + playlistsBtn.innerText;
        const playlistsInfo = await getCurrentPlaylists();

        changeInnerText(contentHeader, headerText)
        closeMenu(menuBtn)
        showPlaylists(contentContainer, contentContainerOpt, "content-container-opt-hidden", playlistsInfo)
        // TODO
    })

    searchBtn.addEventListener("click", function() {
        changeInnerText(contentHeader, searchBtn.innerText)
        closeMenu(menuBtn)
        showSearch(contentContainer, contentContainerOpt, "content-container-opt-hidden")
        // TODO
    })

    signOutBtn.addEventListener("click", function() {
        closeMenu(menuBtn)
        localStorage.removeItem(accessTokenKey)
    })
}