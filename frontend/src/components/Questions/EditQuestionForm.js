import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as questionActions from '../../store/questions';
import { useParams, Redirect } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";


function EditQuestionForm(props) {

    const dispatch = useDispatch();
    const { questionId } = useParams();
    const currentUser = useSelector(state => state.session.user);
    const question = useSelector(state => state.questions[questionId]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState([]);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        dispatch(questionActions.fetchQuestion(questionId))
    }, [])

    useEffect(() => {
        setTitle(question.title);
        setBody(question.body);
    }, [question]);

    if (!question) return null;

    const handleEditorChange =(content, editor) => {
        setBody(content);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setErrors([]);

        return dispatch(questionActions.updateQuestion({
            title, body, id: questionId
        })).then(() => {setRedirect(true)})
            .catch(async (res) => {
                let data;
                try {
                    data = await res.clone().json();
                } catch {
                    data = await res.text();
                }

                if (data?.errors) {
                    setErrors(data.errors);
                } else if (data) {
                    setErrors([data]);
                } else {
                    setErrors([res.statusText]);
                };
            })
    }

    if (redirect) return <Redirect to={`/question/${questionId}`}/>

    return (
        <div className="question-form-main">
            <form className="question-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <Editor
                    value={body}
                    init={{
                        height: 500,
                        menubar: true
                    }}
                    onEditorChange={handleEditorChange}
                />
                {/* <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea> */}
                <input type="submit" name="" value="Submit Question" />
            </form>
            <ul>
                {errors.map(error => <li>{error}</li>)}
            </ul>
        </div>
    )
}

export default EditQuestionForm;