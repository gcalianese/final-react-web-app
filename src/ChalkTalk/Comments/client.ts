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
    console.log("COMMENTS: " + JSON.stringify(response.data));
    return response.data;
};