import './Questions.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { fetchQuestion } from "../../store/questions";
import parse from 'html-react-parser';

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
            <br />
            {parse(question.body)}
            <NavLink to={`/editQuestion/${question.id}`}>Edit Question</NavLink>
        </div>
    )
}

export default QuestionShowPage;