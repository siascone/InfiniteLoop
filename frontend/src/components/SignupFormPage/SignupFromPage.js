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
    );
}

export default SignupFormPage;