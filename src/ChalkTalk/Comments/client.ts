import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const COMMENTS_API = `${REMOTE_SERVER}/api/comments`;

// Create a comment
export const createComment = async (comment: any) => {
    const response = await axiosWithCredentials.post(`${COMMENTS_API}`, comment);
    return response.data;
};

// Get all comments for post
export const getAllCommentsForPost = async (pid: string) => {
    const response = await axiosWithCredentials.get(`${COMMENTS_API}/${pid}`);
    return response.data;
};

// Update a comment
export const updateComment = async (updatedComment : any) => {
    const response = await axiosWithCredentials.put(`${COMMENTS_API}/update`, updatedComment);
    return response.data;
};

// Get all comments for post
export const deleteComment = async (cid: string) => {
    const response = await axiosWithCredentials.delete(`${COMMENTS_API}/${cid}`);
    return response.data;
};