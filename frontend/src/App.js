import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import SignupFormPage from './components/SignupFormPage/SignupFromPage';
import NavBar from './components/Navigation/NavBar';
import { useSelector } from 'react-redux';
import SplashPage from './components/SplashPage/SplashPage';
import QuestionsIndex from './components/Questions/QuestionsIndex';
import QuestionShowPage from './components/Questions/QuestionShowPage';
import NewQuestionForm from './components/Questions/NewQuestionForm';
import EditQuestionForm from './components/Questions/EditQuestionForm';


function App() {

  const currentUser = useSelector(state => state.session.user)

  let home = SplashPage;

  if (currentUser) {
    home = QuestionsIndex
  }

  return (
    <div className='app-container'>
      <NavBar />
      
      <Switch>
        <Route exact path='/login' component={LoginFormPage}/>
        <Route exact path='/signup' component={SignupFormPage}/>
        <Route exact path='/question/:questionId' component={QuestionShowPage} />
        <Route exact path='/newQuestion' component={NewQuestionForm} />
        <Route exact path='/editQuestion/:questionId' component={EditQuestionForm} />
        <Route exact path='/' component={home} />
      </Switch>
    </div>
  );
}

export default App;
