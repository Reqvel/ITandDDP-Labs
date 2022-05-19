import ListItemLink from './ListItemLink'

const SideNav = ({ isShown }) => {
    return (
        <div className={isShown ? 'side-nav' : 'side-nav side-nav-hidden'}>
            <ul>
                <ListItemLink to={"/"} text={"About"}/>
                <ListItemLink to={"/"} text={"Support"}/>
                <ListItemLink to={"/SignIn"} text={"Sign In"}/>
                <ListItemLink to={"https://www.spotify.com/us/signup"} text={"Sign Up"} isExternal={true}/>
            </ul>
        </div>
    )
}

export default SideNav;