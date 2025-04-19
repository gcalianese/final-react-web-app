import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const SEARCH_API = `${REMOTE_SERVER}/api/search`;

// Get nearby gyms for the given zipcode and desired number of results
export const getNearbyGyms = async (zip: string, num: string) => {
    const response = await axiosWithCredentials.get(`${SEARCH_API}/${zip}/${num}`);
    return response.data;
};

