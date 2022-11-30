import { ADDNEW_POST, GETALL_POSTS, GET_POST } from '../Actions/type';

export const postsReducer = (state = [], action) => {
    switch (action.type) {

        case ADDNEW_POST:
            return [action.payload, ...state]
        case GETALL_POSTS:
            return [action.payload]
        case GET_POST:
            return [action.payload]
        default:
            return state;
    }
}