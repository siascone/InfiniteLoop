import React, { useState } from 'react';
import * as SessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
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

        demoLogin(SessionActions.login({credential: 'Demo-lition', password: 'password'}))
    }

    return (
        <div className='signup-form-container'>
            <h1>Signup </h1>
            <form className='signup-form' onSubmit={handleSubmit}>
                <label>
                    <input
                        type='text'
                        id='username'
                        placeholder='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    <input
                        type='text'
                        id='email'
                        placeholder='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <br />
                <label>
                    <input
                        type='password'
                        id='password'
                        placeholder='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <br />
                <input lassName='signup-form-button' type="submit" value="Log In" />
                <br />
                <button className='login-form-button' onClick={e => demoLogin(e)}>Demo Login</button>
                <br />
            </form>
            <ul>
                {errors.map(error => <li key={error}>{error}</li>)}
            </ul>
        </div>
    );
}

export default SignupFormPage;