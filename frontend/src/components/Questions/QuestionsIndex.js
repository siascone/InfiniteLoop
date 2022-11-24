import "./Questions.css"
import LeftSideMenu from "../LeftSideMenu/LeftSideMenu";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import * as questionActions from '../../store/questions';
import QuestionIndexItem from "./QuestionIndexItem";
import { Link, NavLink } from "react-router-dom";


function QuestionsIndex() {
    const dispatch = useDispatch();
    const questions = useSelector(state => Object.values(state.questions))

    useEffect(() => {
        dispatch(questionActions.fetchAllQuestions())
    }, [])

    return (
        <>
            {/* <div className="header-buffer"></div> */}
            <div className="questions-main">
                <div className="question-main-left">
                    Menu
                </div>

                <div className="question-main-center">
                    <div className="question-index-header">
                        <h1>Top Questions</h1>
                        <NavLink to='/newQuestion' className='ask-question'>Ask Question</NavLink>
                    </div>
                    {/* <LeftSideMenu /> */}
                    <div className="questions-index">
                        {questions.map(question => {
                            return <QuestionIndexItem key={question.id} question={question} />
                        })}
                    </div>
                </div>
                <div className="question-main-right">
                    <div className="developer-bio">
                        <div className="developer-bio-github">
                            <div className="dbg-header">
                                GitHub
                            </div>
                            <ul className="dbg-ul">

                            </ul>
                        </div>
                        <div className="developer-bio-linkedin">
                            <div className="dbl-header">
                                LinkedIn
                            </div>
                            <ul className="dbl-ul">

                            </ul>
                        </div>
                        <div className="developer-bio-portfolio">
                            <div className="dbp-header">
                                Portfolio
                            </div>
                            <ul className="dbp-ul">

                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        
        </>
    )
}

export default QuestionsIndex;