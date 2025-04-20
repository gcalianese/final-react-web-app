import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const POSTS_API = `${REMOTE_SERVER}/api/posts`;

// Get all posts marked with the given category
export const getAllPostsForCat = async (cat : string) => {
    const response = await axiosWithCredentials.get(`${POSTS_API}/${cat}`);
    return response.data;
};

// Get posts marked with the given category by users the user with the given uid follows first
export const getPostsForUser = async (cat: string, uid : string) => {
    const response = await axiosWithCredentials.get(`${POSTS_API}/${cat}/${uid}`);
    return response.data;
};

export const uploadImage = async (formData : any) => {
    const response = await axiosWithCredentials.post(`${POSTS_API}`, formData, {
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

export const getAllPostsBy = async (uid : string) => {
    const response = await axiosWithCredentials.get(`${POSTS_API}/by/${uid}`);
    return response.data;
}

export const getPost = async (pid : string) => {
    const response = await axiosWithCredentials.get(`${POSTS_API}/single/${pid}`);
    return response.data;
}
