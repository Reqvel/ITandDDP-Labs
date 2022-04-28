import { changeStyle, hideEl, showEl, msToMinSec } from "./main.js"
import { getUsername, 
         getTracksFromPlaylist, 
         pausePlayback, 
         startResumePlayback,
         getPlaybackState,
         skipToNext,
         skipToPrevious,
         setRepeatMode,
         togglePlaybackShuffle,
         checkUsersSavedTracks,
         saveTracks,
         removeTracks,
         setPlaybackVolume,
         seekToPosition,
         searchForTracks,
         accessTokenKey } from "./API.js"


var STATE_PAUSED = true;
var STATE_POSITION = 0;
var STATE_DURATION = 0;
var IS_MOUSE_DOWN_PB = false;
const STEP = 1000;



greetUser();
showPlayIcon();
setProgressSliders();
setEventListeners();
setInterval(updatePlaybackProgress, STEP);


function setEventListeners() {
  const repeatBtn = document.querySelector(".controls-button-repeat")
  const skipPrevBtn = document.querySelector(".controls-button-prev")
  const playPauseBtn = document.querySelector(".controls-button-play-pause")
  const skipNextBtn = document.querySelector(".controls-button-next")
  const shuffleBtn = document.querySelector(".controls-button-shuffle")
  const favBtn = document.querySelector(".controls-button-fav")
  const volumeSlider = document.querySelector(".progress-bar-volume")
  const progressBarPlayback = document.querySelector(".progress-bar-playback");
  const contentContainer = document.querySelector(".content-container");

  repeatBtn.addEventListener("click", function() {
    toggleRepeat();
  })

  skipPrevBtn.addEventListener("click", function() {
    skipToPrevious();
  })

  playPauseBtn.addEventListener("click", function() {
    togglePlayPause();
  })

  skipNextBtn.addEventListener("click", async function() {
    skipToNext();
  })

  shuffleBtn.addEventListener("click", function() {
    toggleShuffle();
  })
  
  favBtn.addEventListener("click", function() {
    toggleSaved();
  })

  volumeSlider.addEventListener("mouseup", function() {
    setPlaybackVolume(volumeSlider.value);
  })

  progressBarPlayback.addEventListener("mousedown", function() {
    IS_MOUSE_DOWN_PB = true
  })

  progressBarPlayback.addEventListener("mouseup", function() {
    IS_MOUSE_DOWN_PB = false
    seekToPosition(progressBarPlayback.value)
  })

  contentContainer.addEventListener('scroll', function(event)
  {
    var element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight)
    {
        console.log('scrolled');
    }
  });

  window.onSpotifyWebPlaybackSDKReady = () => {
    const token = localStorage.getItem(accessTokenKey);
    const player = new Spotify.Player({
        name: 'Spotifee Web Player',
        getOAuthToken: callback => { callback(token); },
        volume: 0.2
    });

    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    player.addListener('initialization_error', ({ message }) => {
        console.error('initialization_error', message);
    });

    player.addListener('authentication_error', ({ message }) => {
        console.error('authentication_error', message);
    });

    player.addListener('account_error', ({ message }) => {
        console.error('account_error', message);
    });

    player.addListener('player_state_changed', (state) => {
      console.log(state)
      showTrackInfo(
      state.track_window.current_track.album.images[0].url,
      state.track_window.current_track.name,
      getArtistsNames(state.track_window.current_track.artists))
      updatePlayPauseBtn(state.paused);
      updateShuffleBtn(state.shuffle);
      updateRepeatBtn(state.repeat_mode);
      updateFavBtn();
      updateVolumeSlider();

      // For updatePlaybackProgress
      STATE_PAUSED = state.paused
      STATE_POSITION = state.position
      STATE_DURATION = state.track_window.current_track.duration_ms

      updateProgressBarMax();
    });

    player.connect();
}
}


async function toggleSaved() {
  const playbackState = await getPlaybackState();
  if(playbackState) {
    const id = playbackState.item.id;
    const resArr = await checkUsersSavedTracks([id]);
    if(resArr) {
      const isSaved = resArr[0];
      if(isSaved){
        removeTracks([id]);
      }
      else{
        saveTracks([id]);
      updateFavBtn();
      }
    }
  }
}


async function toggleShuffle() {
  const playbackState = await getPlaybackState();
  if(playbackState) {
    const shuffleState = playbackState.shuffle_state;
    togglePlaybackShuffle(!shuffleState);
  }
}


async function toggleRepeat() {
  const playbackState = await getPlaybackState();
  if(playbackState) {
    const offRepeatState = "off";
    const trackRepeatState = "track";
    const contextRepeatState = "context";
    const repeatState = playbackState.repeat_state;
    if (repeatState == offRepeatState) {
      setRepeatMode(trackRepeatState);
    }
    else if (repeatState == trackRepeatState || repeatState == contextRepeatState) {
      setRepeatMode(offRepeatState);
    }
  }
}


function showPlayIcon() {
  const playPauseBtn = document.querySelector(".controls-button-play-pause")
  const pauseIcon = playPauseBtn.querySelector(".pause-icon")
  const playIcon = playPauseBtn.querySelector(".play-icon")
  pauseIcon.style.display = 'none';
  playIcon.style.display = '';
}


function showPauseIcon() {
  const playPauseBtn = document.querySelector(".controls-button-play-pause")
  const pauseIcon = playPauseBtn.querySelector(".pause-icon")
  const playIcon = playPauseBtn.querySelector(".play-icon")
  pauseIcon.style.display = '';
  playIcon.style.display = 'none';
}


function updateProgressBarMax() {
  const progressBarPlayback = document.querySelector(".progress-bar-playback");
  progressBarPlayback.max = STATE_DURATION
  progressBarPlayback.style.setProperty('--max', STATE_DURATION);
}


function updateTime(timePlayedItem, timeLeftItem, timePlayedMs, timeTotalMs) {
  timePlayedItem.innerHTML = msToMinSec(timePlayedMs)
  timeLeftItem.innerHTML = "-" + msToMinSec(timeTotalMs - timePlayedMs)
}


function updatePlaybackProgress() {
  const progressBarPlayback = document.querySelector(".progress-bar-playback");
  const timePlayedItem = document.querySelector(".progress-time-played");
  const timeLeftItem = document.querySelector(".progress-time-left");
  updateTime(timePlayedItem, timeLeftItem, STATE_POSITION, STATE_DURATION)

  STATE_POSITION += (STATE_PAUSED || (STATE_POSITION >= STATE_DURATION)) ? 0 : STEP;
  if(!IS_MOUSE_DOWN_PB) {
    progressBarPlayback.value = STATE_POSITION;
    progressBarPlayback.style.setProperty('--value', STATE_POSITION);
  }
}


async function updateVolumeSlider() {
  const volumeSlider = document.querySelector(".progress-bar-volume");
  const playbackState = await getPlaybackState();
  if(playbackState) {
    const volume = playbackState.device.volume_percent;
    volumeSlider.value = volume;
    volumeSlider.style.setProperty('--value', volume);
  }
}


async function updateFavBtn() {
  const favBtn = document.querySelector(".controls-button-fav")
  const playbackState = await getPlaybackState();
  if(playbackState) {
    const id = playbackState.item.id;
    const resArr = await checkUsersSavedTracks([id]);
    if(resArr) {
      const isSaved = resArr[0];
      if(isSaved){
        changeStyle(favBtn, "controls-button-selected", true);
      }
      else{
        changeStyle(favBtn, "controls-button-selected", false);
      }
    }
  }
}


async function updateRepeatBtn(repeatMode) {
  const repeatBtn = document.querySelector(".controls-button-repeat")
  if (repeatMode == 0) {
    changeStyle(repeatBtn, "controls-button-selected", false);
  }
  else if (repeatMode == 1 ||repeatMode == 2) {
    changeStyle(repeatBtn, "controls-button-selected", true);
  }
}


function updatePlayPauseBtn(paused) {
  if(paused) {
    showPlayIcon();
  }
  else {
    showPauseIcon();
  }
}


function updateShuffleBtn(shuffle) {
  const shuffleBtn = document.querySelector(".controls-button-shuffle")
  if(shuffle) {
    changeStyle(shuffleBtn, "controls-button-selected", true);
  }
  else {
    changeStyle(shuffleBtn, "controls-button-selected", false);
  }
}


async function togglePlayPause() {
  const state = await getPlaybackState();
  if (!state) {
    showPlayIcon();
  }
  else {
    if (state.is_playing) {
      pausePlayback()
    }
    else {
      const contextUri = state.context ? state.context.uri : "";
      startResumePlayback(state.item.uri, state.progress_ms, contextUri);
    }
  }
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


function showTrackInfo(img, title, artists) {
  const trackImg = document.querySelector(".track-img");
  const trackImgCompact = document.querySelector(".track-img-compact");
  const trackTitle = document.querySelector(".left-side-song-name");
  const trackTitleCompact = document.querySelector(".song-name-compact");
  const trackArtists = document.querySelector(".left-side-artist");
  const trackArtistsCompact = document.querySelector(".artist-compact");
  trackImg.src = img;
  trackImgCompact.src = img;
  trackTitle.innerHTML = title;
  trackTitleCompact.innerHTML = title;
  trackArtists.innerHTML = artists;
  trackArtistsCompact.innerHTML = artists;
}


function setTrackListener(tracksItem, playlistId="") {
  for (const el of tracksItem) {
    el.addEventListener("click", function() {
      showTrackInfo(
        el.getElementsByClassName("tracks-list-item-img")[0].getAttribute("src"),
        el.getElementsByClassName("tracks-list-item-title")[0].innerHTML,
        el.getElementsByClassName("tracks-list-item-artist")[0].innerHTML
      )

      startResumePlayback('spotify:track:' + el.getAttribute("id"), 0,
                          'spotify:playlist:' + playlistId);
    })
  }
}


export function showTracks(contentContainer, tracks, playlistId="") {
  contentContainer.innerHTML = '<div class="tracks-list appear-animation"></div>'

  const tracksList = document.querySelector('.tracks-list')
  let trackItemsHTML = ''

  for (let i = 0; i < tracks.length; i++) {
      let imgSrc = '#'
      let trackTitle = ''
      let artistsNames = ''
      let trackId = ''

      if(tracks[i].track && tracks[i].track.album.images.length) {
        imgSrc = tracks[i].track.album.images[0].url;
      }
      else if(tracks[i].album && tracks[i].album.images.length) {
        imgSrc = tracks[i].album.images[0].url;
      }

      if(tracks[i].track) {
        trackTitle = tracks[i].track.name;
      }
      else if(tracks[i].name) {
        trackTitle = tracks[i].name;
      }

      if(tracks[i].track) {
        artistsNames = getArtistsNames(tracks[i].track.artists);
      }
      else if(tracks[i].artists) {
        artistsNames = getArtistsNames(tracks[i].artists);
      }

      if(tracks[i].track) {
        trackId = tracks[i].track.id;
      }
      else if(tracks[i].id){
        trackId = tracks[i].id;
      }

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
  const tracksItem = document.querySelectorAll(".tracks-list-item")
  setTrackListener(tracksItem, playlistId)
}


function setPlaylistListener(contentHeader, contentContainer, playlists) {
  for(const el of playlists) {
      el.addEventListener("click", async function() {
        const playlistId = el.getAttribute("id");
        let tracks = await getTracksFromPlaylist(playlistId)
        const playlistTitle = el.getElementsByClassName("playlist-title")[0].innerHTML;
        changeInnerText(contentHeader, playlistTitle)
        showTracks(contentContainer, tracks, playlistId)
      })
  }
}


export function showPlaylists(contentHeader, contentContainer, optContainer, optContainerClassName, playlistsInfo) {
  hideEl(optContainer, optContainerClassName)

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


export function showSearch(contentContainer, optContainer, optContainerClassName) {
  // TODO
  showEl(optContainer, optContainerClassName)
  contentContainer.innerHTML = "";
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

  searchBtn.addEventListener("click", async function() {
    const tracks = await searchForTracks(searchField.value)
    showTracks(contentContainer, tracks)
  })
}