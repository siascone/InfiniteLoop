import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function NavBar() {
    const sessionUser = useSelector(state => state.session.user);

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            sessionLinks = (
                <ProfileButton user={sessionUser} />
            )
        );
    } else {
        sessionLinks = (
            <div>
                <NavLink className='auth-link' to="/login">Log In</NavLink>
                <NavLink className='auth-link' to="/signup">Sign Up</NavLink>
            </div>
        )
    }
    return (
        <div className='nav-bar'>
            <NavLink exact to='/'>InfiniteLoop</NavLink>
            {sessionLinks}
        </div>
    )
}

export default NavBar;