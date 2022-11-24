import './Questions.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import { fetchQuestion } from "../../store/questions";
import { CopyBlock, dracula } from "react-code-blocks";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import hljs from 'highlight.js';
import parse from 'html-react-parser';



function QuestionShowPage (props) {
    const dispatch = useDispatch();
    const { questionId } = useParams();
    const question = useSelector(state => state.questions[questionId])

    useEffect(() => {
        dispatch(fetchQuestion(questionId))
    }, [])

    if (!question) return null;

    let body = parse(question.body)
    return (
        <div className='question-show'>
            <p>Title: {question.title}</p>
            <br />
            {/* {parse(question.body)} */}
            {/* <CopyBlock 
                text={question.body}
                theme={dracula}
            /> */}
            {/* <SyntaxHighlighter style={docco}> */}
                {question.body}
            {/* </SyntaxHighlighter> */}
            {/* {hljs.highlightElement(parse(question.body))} */}
            {/* {body} */}
            <NavLink to={`/editQuestion/${question.id}`}>Edit Question</NavLink>
        </div>
    )
}

export default QuestionShowPage;