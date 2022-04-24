import { changeStyle } from "./main.js"

// Sliders progress
for (const e of document.querySelectorAll('.slider-progress')) {
  e.style.setProperty('--value', e.value);
  e.style.setProperty('--min', e.min == '' ? '0' : e.min);
  e.style.setProperty('--max', e.max == '' ? '100' : e.max);
  e.addEventListener('input', () => e.style.setProperty('--value', e.value));
}

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