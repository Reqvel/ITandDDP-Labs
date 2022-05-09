import { contentScrolled } from "../actions/ContentScroll";
import { useState } from "react";
import Tracks from "../components/Tracks";
import { searchForTracks, nextItemsUrlKey} from "../API";

const SearchPage = () => {
    const [tracks, setTracks] = useState([])
    const [search, setSearch] = useState("")

    async function getTracks(nextUrl="") {
        const res = await searchForTracks("", nextUrl)
        setTracks([...tracks, ...res[0]])
        localStorage.setItem(nextItemsUrlKey, res[1])
    }

    async function searchTracks() {
        if(search) {
            const res = await searchForTracks(search)
            setTracks(res[0])
            localStorage.setItem(nextItemsUrlKey, res[1])
        }
    }

    return (
        <>
            <h1 className="content-header text cursor-default">Search</h1>
            <div className="content-container-opt">
                <div className="search-container appear-animation">
                    <input className="text input-field input-field-mp-search " 
                            type="text" 
                            placeholder="Artist, track or album" required 
                            onChange={ (e) => { setSearch(e.target.value) } } />
                    <button className="text input-button input-button-pm-search"
                            onClick={ searchTracks }>
                        Search
                    </button>
                </div>
            </div>
            <div className="content-container" onScroll={ (e) => contentScrolled(e, getTracks)}>
                {
                    tracks?.length > 0
                    ? ( <Tracks tracks={tracks}/>) : (<></>)
                } 
            </div>
        </>
    )
}

export default SearchPage;