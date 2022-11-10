import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import SignupFormPage from './components/SignupFormPage/SignupFromPage';
import NavBar from './components/Navigation/NavBar';

function App() {
  return (
    <div className='app-container'>
      <NavBar />
      
      <Switch>
        <Route exact path='/login' component={LoginFormPage}/>
        <Route exact path='/signup' component={SignupFormPage}/>
      </Switch>
    </div>
  );
}

export default App;
