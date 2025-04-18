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

export const uploadImage = async (formData : any) => {
    const response = await axiosWithCredentials.post(`${POSTS_API}/sends`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    return response.data;
}

export const deletePost = async (pid : string) => {
    const response = await axiosWithCredentials.delete(`${POSTS_API}/${pid}`);
    return response.data;
}
