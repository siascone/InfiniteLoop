import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
        <div className='login-form-container'>
            <h1>Login</h1>
            <form className='login-form' onSubmit={handleSubmit}>
                <label>
                    <input
                        type='text'
                        id='credential'
                        placeholder='Username or Email'
                        value={credential}
                        onChange={(e) => setCredential(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    <input
                        type="password"
                        id="password"
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <button className='login-form-button' type="submit">Log In</button>
                <br />
                <button className='login-form-button' onClick={e => demoLogin(e)}>Demo Login</button>
                <br />
            </form>
            <ul>
                {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
        </div>
    );
};

export default LoginFormPage;