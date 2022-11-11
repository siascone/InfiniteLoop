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
            <div className='nav-links'>
                <NavLink className='auth-link-login' to="/login">Log In</NavLink>
                <NavLink className='auth-link-signup' to="/signup">Sign Up</NavLink>
            </div>
        )
    }
    return (
        <div className='nav-bar'>
            <NavLink className='nav-logo' exact to='/'><img className='nav-logo-img' src={window.logo} /><span className='infinite'>infinite</span><span className='loop'>loop</span></NavLink>
            {sessionLinks}
        </div>
    )
}

export default NavBar;