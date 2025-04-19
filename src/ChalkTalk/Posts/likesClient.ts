import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const LIKES_API = `${REMOTE_SERVER}/api/likes`;

// Likes for the posts with the given pids
export const getLikesForPids = async (pids: String[]) => {
    const response = await axiosWithCredentials.get(`${LIKES_API}`, {
        params: { pids },
    });
    console.log("got likes: " + JSON.stringify(response.data));
    return response.data;
};

// Get all likes
export const getAllLikes = async () => {
    const response = await axiosWithCredentials.get(`${LIKES_API}`);
    console.log("got likes: " + JSON.stringify(response.data));
    return response.data;
};

// Add a like
export const createLike = async (like: any) => {
    const response = await axiosWithCredentials.post(`${LIKES_API}`, like);
    return response.data;
};

// Unlike a post
export const unlike = async (pid: string, uid: string) => {
    const response = await axiosWithCredentials.delete(`${LIKES_API}/${pid}/${uid}`);
    return response.data;
};


