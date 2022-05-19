import { Link } from "react-router-dom"

const ListItemLink = ({ to, text, isExternal=false, onClick=null }) => {
    return (
        <li>
            {
                isExternal ?
                <a href={to} className="a text nav-text" onClick={onClick}>{text}</a> :
                <Link to={to} className="a text nav-text" onClick={onClick}>{text}</Link>
            }
        </li>
    )
}

export default ListItemLink;