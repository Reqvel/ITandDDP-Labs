export function changeStyle(el, className, add) {
    if(add) el.classList.add(className);
    else el.classList.remove(className);
}


export function showEl(el, className) {
    if(el.classList.contains(className)) {
        el.classList.remove(className)
    }
}


export function hideEl(el, className) {
    if(!(el.classList.contains(className))) {
        el.classList.add(className)
    }
}


export function showHideMenu(el, className) {
    if(el.classList.contains(className)) {
        el.classList.remove(className)
    }
    else {
        el.classList.add(className)
    }
}


export function msToMinSec(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var minSec = secs > 9 ? (mins + ':' + secs) : (mins + ':0' + secs );
    return minSec
  }