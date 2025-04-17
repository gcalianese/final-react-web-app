import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const POSTS_API = `${REMOTE_SERVER}/api/posts`;

// Get all posts marked "SENDS"
export const getAllSends = async () => {
    const response = await axiosWithCredentials.get(`${POSTS_API}/sends`);
    return response.data;
};

// Get posts marked "SENDS" by users the user with the given cid follows first
export const getSendsForUser = async (cid : string) => {
    const response = await axiosWithCredentials.get(`${POSTS_API}/sends/${cid}`);
    return response.data;
};
