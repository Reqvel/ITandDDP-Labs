import { showEl, hideEl } from "./main.js"

setEventListeners()

function setPlaylistListener(playlists) {
    for(const el of playlists) {
        el.addEventListener("click", function() {
            // TODO
            console.log("Playlist Click!")
        })
    }
}

function showPlaylists(contentContainer, optContainer, optContainerClassname) {
    // TODO
    hideEl(optContainer, optContainerClassname)

    contentContainer.innerHTML = '<div class="playlists-grid appear-animation"></div>'
    const playlistsGrid = document.querySelector('.playlists-grid')

    let gridItemsHTML = ''

    for (let i = 30; i > 0; i--) {
        gridItemsHTML += 
        `
        <div class="playlists-grid-item cursor-pointer">
            <img src="#" class="playlist-img">
            <span class="text playlist-title">Playlist ${i}</span>
            <span class="text playlist-description">Description</span>
        </div>
        `
    }

    playlistsGrid.innerHTML = gridItemsHTML

    const playlists = document.querySelectorAll(".playlists-grid-item")
    setPlaylistListener(playlists)
}

function setTrackListener() {
    for(const el of playlists) {
        el.addEventListener("click", function() {
            // TODO
            console.log("Track Click!")
        })
    }
}

function showTracks(contentContainer) {
    contentContainer.innerHTML = '<div class="tracks-list appear-animation"></div>'
    const tracksList = document.querySelector('.tracks-list')

    let trackItemsHTML = ''

    for (let i = 30; i > 0; i--) {
        trackItemsHTML += 
        `
        <div class="tracks-list-item cursor-pointer">
            <img src="#" class="tracks-list-item-img">
            <div class="tracks-list-item-info">
                <span class="text tracks-list-item-title">Title ${i}</span>
                <span class="text tracks-list-item-artist">Artist</span>
            </div>
        </div>
        `
    }

    tracksList.innerHTML = trackItemsHTML
    const tracks = document.querySelectorAll(".tracks-list-item")
    setTrackListener(tracks)
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

function changeInnerText(el, text) {
    el.innerText = text
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

    playlistsBtn.addEventListener("click", function() {
        changeInnerText(contentHeader, playlistsBtn.innerText)
        closeMenu(menuBtn)
        showPlaylists(contentContainer, contentContainerOpt, "content-container-opt-hidden")
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
        // TODO
    })
}