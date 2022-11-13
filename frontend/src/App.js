import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import SignupFormPage from './components/SignupFormPage/SignupFromPage';
import NavBar from './components/Navigation/NavBar';
// import { useSelector } from 'react-redux';
import SplashPage from './components/SplashPage/SplashPage';

function App() {

  // const currentUser = useSelector(state => state.session.user);

  let home = SplashPage;

  // if (currentUser) {
  //   console.log('Hello world');
  // }

  return (
    <div className='app-container'>
      <NavBar />
      <Switch>
        <Route exact path='/login' component={LoginFormPage}/>
        <Route exact path='/signup' component={SignupFormPage}/>
        <Route exact path='/' component={home} />
      </Switch>
    </div>
  );
}

export default App;
