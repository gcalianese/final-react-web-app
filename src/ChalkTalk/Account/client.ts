import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

// Sign in with the given credentials
export const signin = async (credentials : any ) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
    return response.data;
};

// Sign out the current user
export const signout = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    return response.data;
};

// Return the user with the given id
export const getUserById = async (uid : String) => {
    const response = await axiosWithCredentials.get(`${USERS_API}/${uid}`);
    return response.data;
};

// Return list of users follow the user with the given id
export const getUsersFollowing = async (uid : String) => {
    const response = await axiosWithCredentials.get(`${USERS_API}/followers/${uid}`);
    return response.data;
};

// Return the list of users the user with the given id is following
export const getUsersFollowedBy = async (uid : String) => {
    const response = await axiosWithCredentials.get(`${USERS_API}/follows/${uid}`);
    return response.data;
};

// Get the profile for the session
export const profile = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    return response.data;
};

// Create a new USER with the given username, password, first name, and last name
export const createUser = async (user : any) => {
    const response = await axiosWithCredentials.post(`${USERS_API}`, user);
    return response.data;
};

// update a user
export const updateUser = async (user : any) => {
    const response = await axiosWithCredentials.put(`${USERS_API}`, user);
    return response.data;
};