import csrfFetch from './csrf';

const RECEIVE_QUESTION = 'RECEIVE_QUESTION';
const RECEIVE_ALL_QUESTIONS = 'RECEIVE_ALL_QUESTIONS';
const REMOVE_QUESTION = 'REMOVE_QUESTION';

export const receiveAllQuestions = (payload) => {
    return {
        type: RECEIVE_ALL_QUESTIONS,
        payload
    }
}

export const receiveQuestion = (payload) => {
    return {
        type: RECEIVE_QUESTION,
        payload
    }
}

export const removeQuestion = (payload) => {
    return {
        type: REMOVE_QUESTION,
        payload
    }
}

export const fetchAllQuestions = () => async dispatch => {
    const response = await csrfFetch('/api/questions');
    const data = await response.json();
    dispatch(receiveAllQuestions(data));
}

export const fetchQuestion = (questionId) => async dispatch => {
    const response = await csrfFetch(`/api/questions/${questionId}`);
    const data = await response.json();
    dispatch(receiveQuestion(data));
}

export const createQuestion = (question) => async dispatch => {
    const response = await csrfFetch('/api/questions', {
        method: 'POST',
        body: JSON.stringify({
            question
        })
    })
    const data = await response.json();
    dispatch(receiveQuestion(data));
}

export const updateQuestion = (question) => async dispatch => {
    const response = await csrfFetch(`/api/questions/${question.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            question
        })
    });
    const data = await response.json();
    dispatch(receiveQuestion(data));
}

export const deleteQuestion =(questionId) => async dispatch => {
    const response = await csrfFetch(`/api/questions/${questionId}`,{
        method: 'DELETE',
    });
    const data = await response.json();
    dispatch(removeQuestion(data))
}

const QuestionsReducer = (state = {}, action) => {
    Object.freeze(state);
    let nextState = { ...state };

    switch (action.type) {
        case RECEIVE_ALL_QUESTIONS:
            return Object.assign({}, nextState, action.payload);
        case RECEIVE_QUESTION:
            nextState[action.payload.id] = action.payload;
            return nextState;
        case REMOVE_QUESTION:
            delete nextState[action.payload.id];
            return nextState;
        default:
            return state;
    }
}

export default QuestionsReducer;