import { NavLink } from "react-router-dom";

function QuestionIndexItem (props) {
    return (
        <div className="question-index-item-main">
            <NavLink to={`/question/${props.question.id}`}>{props.question.title}</NavLink>
        </div>
    )
}

export default QuestionIndexItem;