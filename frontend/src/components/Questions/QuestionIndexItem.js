import { NavLink } from "react-router-dom";

function QuestionIndexItem (props) {
    return (
        <>
            <NavLink to={`/question/${props.question.id}`}>Title: {props.question.title}</NavLink>
        </>
    )
}

export default QuestionIndexItem;