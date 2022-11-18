import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as SessionActions from '../../store/session';
import './Navigation.css';

function NavBar() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    let sessionLinks;

    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(SessionActions.logout());
    };

    if (sessionUser) {
        sessionLinks = (
            sessionLinks = (
                <div className='nav-links-logged-in'>
                    <NavLink to='/newQuestion' className='ask-a-question'>Ask a Question</NavLink>
                    <button className='nav-logout' onClick={logout}>Logout</button>
                    <ProfileButton user={sessionUser} />
                </div>
            )
        );
    } else {
        sessionLinks = (
            <div className='nav-links'>
                <NavLink className='auth-link-login' to="/login">Log In</NavLink>
                <NavLink className='auth-link-signup' to="/signup">Sign Up</NavLink>
            </div>
        )
    }
    return (
        <div className='nav-bar'>
            <div className='nav-bar-left'>
                {/* <div className="nav-menu" onClick={openMenu}>
                    <i className="fas fa-bars"></i>
                    {showMenu && (
                        <ul className='menu-dropdown'>
                            <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={logout}>Log Out</button>
                    </li>
                            Menu coming soon.
                        </ul>
                    )}
                </div> */}
                <NavLink className='nav-logo' exact to='/'><img className='nav-logo-img' src={window.logo} /><span className='infinite'>infinite</span><span className='loop'>loop</span></NavLink>
            </div>
            {sessionLinks}
        </div>
    )
}

export default NavBar;