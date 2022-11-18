import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as questionActions from '../../store/questions';
import { Redirect } from "react-router-dom";


function NewQuestionForm (props) {

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [errors, setErrors] = useState([]);
    const [redirect, setRedirect] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setErrors([]);

        return dispatch(questionActions.createQuestion({
            title, body
        })).then(() => { setRedirect(true) })
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
            });
    }

    if (redirect) return <Redirect to="/" />

    return (
        <div className="question-form-main">
            <form className="question-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}    
                />
                <br />
                <textarea 
                    placeholder="more details here"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <input type="submit" name="" value="Submit Question"/>
            </form>
            <ul>
                {errors.map( error => <li>{error}</li>)}
            </ul>
        </div>
    )
}

export default NewQuestionForm;