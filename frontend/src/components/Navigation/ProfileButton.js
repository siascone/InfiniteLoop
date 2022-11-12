import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionAction from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
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
        dispatch(sessionAction.logout());
    };

    const showAlert = (e) => {
        e.preventDefault();
        e.stopPropagation();

        return alert("User Profile coming soon.")
    }

    return (
        <div className='profile-main'>
            <button onClick={openMenu}>
                <i className='fa-solid fa-user' />
            </button>
            {showMenu && (
                <ul className='profile-dropdown'>
                    {/* <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={logout}>Log Out</button>
                    </li> */}
                    User Profile coming soon.
                </ul>
            )}
        </div>
    )
}

export default ProfileButton;