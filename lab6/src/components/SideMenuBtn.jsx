import { ReactComponent as MenuIconM } from '../svgs/MenuIconM.svg'
import '../css/music-player.css'
import '../css/base.css'

const SideMenuBtn = ({ isShown, showHideSideMenu }) => {
    return (
        <button className={isShown ? 
                            "menu-button menu-button-mp cursor-pointer menu-button-selected" :
                            "menu-button menu-button-mp cursor-pointer"}
                onClick={showHideSideMenu}>
            <MenuIconM />
        </button>
    )
}

export default SideMenuBtn;