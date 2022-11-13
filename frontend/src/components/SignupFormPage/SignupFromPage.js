import React, { useState } from 'react';
import * as SessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import './SignupForm.css'

function SignupFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    
    if (sessionUser) return <Redirect to='/' />

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(SessionActions.signup({username, email, password}))
            .catch(async (res) => {
                let data;
                try{
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                };

                if (data?.errors) {
                    setErrors(data.errors);
                } else if (data) {
                    setErrors([data]);
                } else {
                    setErrors([res.statusText]);
                };
            });
    };

    const demoLogin = (e) => {
        e.preventDefault();
        e.stopPropagation();

        dispatch(SessionActions.login({ credential: 'Demo-lition', password: 'password' }))
    }

    return (
        <div className='signup-main'>
            <div className='signup-form-left'>
                <h1>Join the Stack Overflow community</h1>
                <br />
                <ul>
                    <li><svg width="26" height="26" class="svg-icon mtn2"><path opacity=".5" d="M4.2 4H22a2 2 0 012 2v11.8a3 3 0 002-2.8V5a3 3 0 00-3-3H7a3 3 0 00-2.8 2z"></path><path d="M1 7c0-1.1.9-2 2-2h18a2 2 0 012 2v12a2 2 0 01-2 2h-2v5l-5-5H3a2 2 0 01-2-2V7zm10.6 11.3c.7 0 1.2-.5 1.2-1.2s-.5-1.2-1.2-1.2c-.6 0-1.2.4-1.2 1.2 0 .7.5 1.1 1.2 1.2zm2.2-5.4l1-.9c.3-.4.4-.9.4-1.4 0-1-.3-1.7-1-2.2-.6-.5-1.4-.7-2.4-.7-.8 0-1.4.2-2 .5-.7.5-1 1.4-1 2.8h1.9v-.1c0-.4 0-.7.2-1 .2-.4.5-.6 1-.6s.8.1 1 .4a1.3 1.3 0 010 1.8l-.4.3-1.4 1.3c-.3.4-.4 1-.4 1.6 0 0 0 .2.2.2h1.5c.2 0 .2-.1.2-.2l.1-.7.5-.7.6-.4z"></path></svg> Get unstuck - ask a question</li>
                    <li><svg width="26" height="26" class="svg-icon mtn2"><path d="M12 .7a2 2 0 013 0l8.5 9.6a1 1 0 01-.7 1.7H4.2a1 1 0 01-.7-1.7L12 .7z"></path><path opacity=".5" d="M20.6 16H6.4l7.1 8 7-8zM15 25.3a2 2 0 01-3 0l-8.5-9.6a1 1 0 01.7-1.7h18.6a1 1 0 01.7 1.7L15 25.3z"></path></svg> Unlock new privileges like voting and commenting</li>
                    <li><svg width="26" height="26" class="svg-icon mtn2"><path d="M14.8 3a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8l8.2 8.2c.8.8 2 .8 2.8 0l10-10c.4-.4.6-.9.6-1.4V5a2 2 0 00-2-2h-8.2zm5.2 7a2 2 0 110-4 2 2 0 010 4z"></path><path opacity=".5" d="M13 0a2 2 0 00-1.4.6l-10 10a2 2 0 000 2.8c.1-.2.3-.6.6-.8l10-10a2 2 0 011.4-.6h9.6a2 2 0 00-2-2H13z"></path></svg> Save your favorite tags, filters, and jobs</li>
                    <li><svg width="26" height="26" class="svg-icon mtn2"><path d="M21 4V2H5v2H1v5c0 2 2 4 4 4v1c0 2.5 3 4 7 4v3H7s-1.2 2.3-1.2 3h14.4c0-.6-1.2-3-1.2-3h-5v-3c4 0 7-1.5 7-4v-1c2 0 4-2 4-4V4h-4zM5 11c-1 0-2-1-2-2V6h2v5zm11.5 2.7l-3.5-2-3.5 1.9L11 9.8 7.2 7.5h4.4L13 3.8l1.4 3.7h4L15.3 10l1.4 3.7h-.1zM23 9c0 1-1 2-2 2V6h2v3z"></path></svg> Earn reputation and badges</li>
                </ul>
                <br />
                <p>Collaborate and share knowledge with a private group for FREE</p>
            </div>
            <div className='signup-form-right'>
            
                <div className='signup-message'>
                    <p>Create your Stack Overflow account. It’s</p>
                    <p>free and only takes a minute.</p>
                </div>

                <div className='login-bio-links'>
                    <a href="https://spenceriascone.com" target="_blank" className='portfolio'><i class="fa fa-user" aria-hidden="true"></i> <span>Developer portfolio</span></a>
                    <a href="https://github.com/siascone/InfiniteLoop" target="_blank" className='github'><i class="fa-brands fa-github"></i> <span>infiniteLoop GitHub</span></a>
                    <a href="https://www.linkedin.com/in/spencer-iascone-56b28b62/" target="_blank" className='linkedIn'><i class="fa-brands fa-linkedin-in"></i> <span>Connect on LinkedIn</span></a>
                </div>

                <div className='signup-form-container'>
                    <form className='signup-form' onSubmit={handleSubmit}>
                        <label id='signup-label' for='username'>Display name</label>
                        <input
                            type='text'
                            id='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <br />
                        <label id='signup-label' for="email">Email</label>
                        <input
                            type='text'
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <br />
                        <label id='signup-label' for="password">Password</label>
                        <input
                            type='password'
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className='password-message'>
                            <p>Passwords must contain at least six characters.</p>
                        </div>
                        <br />
                        <button className='login-form-button' type="submit">Log In</button>
                        <br />
                        <button className='login-form-button' onClick={e => demoLogin(e)}>Demo Login</button>
                    </form>
                    <br />
                    <br />
                    <label className='agreement-message'>
                        <p>By clicking “Sign up”, you agree to our <span>be nice</span> policy. Please be positive and constructive. Thank you and have a great day!</p>
                    </label>
                    <ul>
                        {errors.map(error => <li key={error}>{error}</li>)}
                    </ul>
                </div>

                <div className='signup-login-link'>
                    <p>Already have an account? <NavLink to='/signup'>Log in</NavLink></p>
                    <p></p>
                </div>
            </div>
        </div>
    );
}

export default SignupFormPage;