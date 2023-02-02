import React, {useState, useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import SignupFormPage from './components/SignupFormPage/SignupFromPage';
import NavBar from './components/Navigation/NavBar';
// import { useSelector } from 'react-redux';
import SplashPage from './components/SplashPage/SplashPage';
import UsersIndex from './components/Users/UsersIndex';
import Form from './components/Users/Form';

function App() {
  const [users, setUsers] = useState([])
  // const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users")
      setUsers(await res.json())
    }

    fetchUsers()
  }, [])

  let home = SplashPage;

  // if (currentUser) {
  //   console.log('Hello world');
  // }

  return (
    <div className='app-container'>
      <NavBar />
      <UsersIndex users={users} />
      <Form userId={1}/>
      <Switch>
        <Route exact path='/login' component={LoginFormPage}/>
        <Route exact path='/signup' component={SignupFormPage}/>
        <Route exact path='/' component={home} />
      </Switch>
    </div>
  );
}

export default App;
