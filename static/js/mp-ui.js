import { changeStyle, showEl, hideEl } from "./main.js"
import { getUsername, getCurrentPlaylists } from "./API.js"


greetUser()
setProgressSliders()
setEventListeners()


function setEventListeners() {
  const repeatBtn = document.querySelector(".controls-button-repeat")
  const skipPrevBtn = document.querySelector(".controls-button-prev")
  const playPauseBtn = document.querySelector(".controls-button-play-pause")
  const skipNextBtn = document.querySelector(".controls-button-next")
  const shuffleBtn = document.querySelector(".controls-button-shuffle")
  const favBtn = document.querySelector(".controls-button-fav")

  repeatBtn.addEventListener("click", function() {
    changeStyle(repeatBtn, "controls-button-selected")
    // TODO
  })

  skipPrevBtn.addEventListener("click", function() {
    // TODO
  })

  playPauseBtn.addEventListener("click", function() {
    // TODO
  })

  skipNextBtn.addEventListener("click", function() {
    // TODO
  })

  shuffleBtn.addEventListener("click", function() {
    changeStyle(shuffleBtn, "controls-button-selected")
    // TODO
  })
  
  favBtn.addEventListener("click", function() {
    // TODO
  })
}


async function greetUser() {
  const username = await getUsername();
  if(username) {
    const contentHeader = document.querySelector(".content-header");
    contentHeader.innerHTML = `Hi, ${username}!`
  }
}


function setProgressSliders() {
  for (const e of document.querySelectorAll('.slider-progress')) {
    e.style.setProperty('--value', e.value);
    e.style.setProperty('--min', e.min == '' ? '0' : e.min);
    e.style.setProperty('--max', e.max == '' ? '100' : e.max);
    e.addEventListener('input', () => e.style.setProperty('--value', e.value));
  }
}


export function changeInnerText(el, text) {
  el.innerText = text
}


export function showTracks(contentContainer) {
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


function setPlaylistListener(playlists) {
  for(const el of playlists) {
      el.addEventListener("click", function() {
        // TODO
      })
  }
}


export function showPlaylists(contentContainer, optContainer, optContainerClassname, playlistsInfo) {
  hideEl(optContainer, optContainerClassname)

  if(playlistsInfo) {
    console.log(playlistsInfo) // TO DELETE
    contentContainer.innerHTML = '<div class="playlists-grid appear-animation"></div>'

    const playlistsGrid = document.querySelector('.playlists-grid')
    let gridItemsHTML = ''

    for (let i = 0; i < playlistsInfo.length; i++) {
        let imgSrc = '#'
        let playlistName = ''
        let playlistDescription = ''
        let tracksHref = ''

        if(playlistsInfo[i].images.length) {
          imgSrc = playlistsInfo[i].images[0].url;
        }

        playlistName = playlistsInfo[i].name;

        if(playlistsInfo[i].description) {
          playlistDescription = playlistsInfo[i].description;
        }
        else if(playlistsInfo[i].owner.display_name) {
          playlistDescription += 'Author: ';
          playlistDescription += playlistsInfo[i].owner.display_name;
        }

        tracksHref = playlistsInfo[i].tracks.href;

        gridItemsHTML += 
        `
        <div href="${tracksHref}" class="playlists-grid-item cursor-pointer">
            <img src="${imgSrc}" class="playlist-img">
            <span class="text playlist-title">${playlistName}</span>
            <span class="a text playlist-description">${playlistDescription}</span>
        </div>
          `
    }

    playlistsGrid.innerHTML = gridItemsHTML

    const playlists = document.querySelectorAll(".playlists-grid-item")
    setPlaylistListener(playlists)
  }
}