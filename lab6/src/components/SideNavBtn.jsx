import { ReactComponent as MenuIconS } from '../svgs/MenuIconS.svg'
import clsx from 'clsx';

const SideNavBtn = ({ isShown, onClick }) => {
    return (
        <button 
          className={ clsx({
              "menu-button menu-button-media cursor-pointer": true,
              "menu-button-selected": isShown
          }) } onClick={onClick}>
          <MenuIconS />
        </button>
    )
}

export default SideNavBtn