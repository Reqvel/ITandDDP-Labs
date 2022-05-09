import { nextItemsUrlKey } from "../API";

export function contentScrolled(e, fun) {
    const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
        const nextItemsUrl = localStorage.getItem(nextItemsUrlKey)
        if(nextItemsUrl != "null") {
            fun(nextItemsUrl)
        }
    }
}