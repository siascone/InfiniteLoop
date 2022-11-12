import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    
    if (sessionUser) return <Redirect to="/" />

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({credential, password}))
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                };

                if (data?.errors) {
                    setErrors(data.errors);
                } else if (data) {
                    setErrors([data])
                } else {
                    setErrors([res.statusText]);
                };
            });
    };

    const demoLogin = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password'}))
    }

    return (
        <div className='login-main'>

            <div className='login-logo'>
                <img src={window.logo} />
            </div>

            <div className='login-bio-links'>
                <a href="https://spenceriascone.com" target="_blank" className='portfolio'><i class="fa fa-user" aria-hidden="true"></i> <span>Developer portfolio</span></a>
                <a href="https://github.com/siascone/InfiniteLoop" target="_blank" className='github'><i class="fa-brands fa-github"></i> <span>infiniteLoop GitHub</span></a>
                <a href="https://www.linkedin.com/in/spencer-iascone-56b28b62/" target="_blank" className='linkedIn'><i class="fa-brands fa-linkedin-in"></i> <span>Connect on LinkedIn</span></a>
            </div>

            <div className='login-form-container'>
                <form className='login-form' onSubmit={handleSubmit}>
                    <label for='credential'>Email</label>
                    <input
                        type='text'
                        id='credential'
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                    <br />
                    <label for='password'>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <br />
                    <button className='login-form-button' type="submit">Log In</button>
                    <br />
                    <button className='login-form-button' onClick={e => demoLogin(e)}>Demo Login</button>
                </form>
                <ul>
                    {errors.map((error, i) => <li key={i}>{error}</li>)}
                </ul>
            </div>

            <div className='login-signup-link'>
                <p>Don't have an account? <NavLink to='/signup'>Sign up</NavLink></p>
                <p></p>
            </div>
        </div>
    );
};

export default LoginFormPage;