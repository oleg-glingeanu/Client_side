import axios  from 'axios';
import { ADDNEW_POST, GETALL_POSTS, GET_POST } from './type';


const API_URL = 'https://serverside-production.up.railway.app';


export const addNewPost = (data) => async(dispatch) => {
    try {
        const res = await axios.post(`${API_URL}/posts`, data)
        
        dispatch( { type: ADDNEW_POST, payload: res.data })

    } catch (error) {
        console.log(error.message)
    }
}

export const getAllPosts = () => async(dispatch) => {
    try {
        const res = await axios.get(`${API_URL}/posts`);
        dispatch( { type: GETALL_POSTS, payload: res.data })
    } catch (error) {
        console.log(error.message)
    }
}

export const getPost = (id) => async(dispatch) => {
    try {
        const res = await axios.get(`https://serverside-production.up.railway.app/posts/${id}`);
        dispatch( { type: GET_POST, payload: res.data })
    } catch (error) {
        console.log(error.message)
    }
}