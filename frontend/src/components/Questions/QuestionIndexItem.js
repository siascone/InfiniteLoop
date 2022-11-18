import { NavLink } from "react-router-dom";

function QuestionIndexItem (props) {
    return (
        <div className="question-index-item-main">
            <div className="question-index-item-votes">
                votes
            </div>
            <NavLink to={`/question/${props.question.id}`}>{props.question.title}</NavLink>
        </div>
    )
}

export default QuestionIndexItem;