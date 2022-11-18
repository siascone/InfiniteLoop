import "./Questions.css"
import LeftSideMenu from "../LeftSideMenu/LeftSideMenu";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import * as questionActions from '../../store/questions';
import QuestionIndexItem from "./QuestionIndexItem";

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
                {/* <LeftSideMenu /> */}
                <div className="questions-index">
                    {questions.map(question => {
                        return <QuestionIndexItem key={question.id} question={question} />
                    })}
                </div>
            </div>
        
        </>
    )
}

export default QuestionsIndex;