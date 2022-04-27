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