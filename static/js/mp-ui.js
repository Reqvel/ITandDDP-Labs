import { changeStyle, hideEl } from "./main.js"
import { getUsername, getTracksFromPlaylist } from "./API.js"


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


function getArtistsNames(artists) {
  var names = ''
  for (const artist of artists) {
    names += artist.name
    names += ', '
  }
  if(names) {
    names = names.slice(0, -2);
  }
  return names
}


export function showTracks(contentContainer, tracks) {
  contentContainer.innerHTML = '<div class="tracks-list appear-animation"></div>'

  const tracksList = document.querySelector('.tracks-list')
  let trackItemsHTML = ''

  for (let i = 0; i < tracks.length; i++) {
      let imgSrc = '#'
      let trackTitle = ''
      let artistsNames = ''
      let trackId = ''

      if(tracks[i].track.album.images.length) {
        imgSrc = tracks[i].track.album.images[0].url;
      }

      trackTitle = tracks[i].track.name;

      artistsNames = getArtistsNames(tracks[i].track.artists);

      trackId = tracks[i].track.id;

      trackItemsHTML += 
      `
      <div id="${trackId}"class="tracks-list-item cursor-pointer">
          <img src="${imgSrc}" class="tracks-list-item-img">
          <div class="tracks-list-item-info">
              <span class="text tracks-list-item-title">${trackTitle}</span>
              <span class="text tracks-list-item-artist">${artistsNames}</span>
          </div>
      </div>
      `
  }

  tracksList.innerHTML = trackItemsHTML
  // const tracksItem = document.querySelectorAll(".tracks-list-item")
  // setTrackListener(tracksItem)
}


function setPlaylistListener(contentHeader, contentContainer, playlists) {
  for(const el of playlists) {
      el.addEventListener("click", async function() {
        const playlistId = el.getAttribute("id");
        let tracks = await getTracksFromPlaylist(playlistId)
        const playlistTitle = el.getElementsByClassName("playlist-title")[0].innerHTML;
        changeInnerText(contentHeader, playlistTitle)
        showTracks(contentContainer, tracks)
      })
  }
}


export function showPlaylists(contentHeader, contentContainer, optContainer, optContainerClassname, playlistsInfo) {
  hideEl(optContainer, optContainerClassname)

  if(playlistsInfo) {
    contentContainer.innerHTML = '<div class="playlists-grid appear-animation"></div>'

    const playlistsGrid = document.querySelector('.playlists-grid')
    let gridItemsHTML = ''

    for (let i = 0; i < playlistsInfo.length; i++) {
        let imgSrc = '#'
        let playlistTitle = ''
        let playlistDescription = ''
        let playlistId = ''

        if(playlistsInfo[i].images.length) {
          imgSrc = playlistsInfo[i].images[0].url;
        }

        playlistTitle = playlistsInfo[i].name;

        if(playlistsInfo[i].description) {
          playlistDescription = playlistsInfo[i].description;
        }
        else if(playlistsInfo[i].owner.display_name) {
          playlistDescription += 'Author: ';
          playlistDescription += playlistsInfo[i].owner.display_name;
        }

        playlistId = playlistsInfo[i].id;

        gridItemsHTML += 
        `
        <div id="${playlistId}" class="playlists-grid-item cursor-pointer">
            <img src="${imgSrc}" class="playlist-img">
            <span class="text playlist-title">${playlistTitle}</span>
            <span class="a text playlist-description">${playlistDescription}</span>
        </div>
          `
    }

    playlistsGrid.innerHTML = gridItemsHTML

    const playlistsItem = document.querySelectorAll(".playlists-grid-item")
    setPlaylistListener(contentHeader, contentContainer, playlistsItem)
  }
}