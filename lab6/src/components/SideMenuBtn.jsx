import { ReactComponent as MenuIconM } from '../svgs/MenuIconM.svg'
import clsx from 'clsx';

const SideMenuBtn = ({ isShown, showHideSideMenu }) => {
    return (
        <button className={ clsx({
            "menu-button menu-button-mp cursor-pointer": true,
            "menu-button-selected": isShown
        }) } onClick={showHideSideMenu}>
            <MenuIconM />
        </button>
    )
}

export default SideMenuBtn;