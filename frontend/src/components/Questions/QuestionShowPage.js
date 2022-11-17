import './Questions.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchQuestion } from "../../store/questions";


function QuestionShowPage (props) {
    const dispatch = useDispatch();
    const { questionId } = useParams();
    const question = useSelector(state => state.questions[questionId])

    useEffect(() => {
        dispatch(fetchQuestion(questionId))
    }, [])

    if (!question) return null;

    return (
        <div className='question-show'>
            <p>Title: {question.title}</p>
            <p>Body: {question.body}</p>
        </div>
    )
}

export default QuestionShowPage;