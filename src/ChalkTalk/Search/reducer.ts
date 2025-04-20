import { createSlice } from "@reduxjs/toolkit";

// interface Gym {
//     id: number;
//     lat: number;
//     lon: number;
//     name: string;
//     sport: string;
//     address: {
//         house: string,
//         street: string,
//         city: string,
//         postcode: string,
//     }
//     website: string;
// }

const initialState = {
    gyms: [],
    lastSearchedZipCode: "",
    lastSearchedNumResults: 5,
    zipCode: "",
    numResults: 5,
};

const gymsSlice = createSlice({
    name: "gyms",
    initialState,
    reducers: {
        setGyms: (state, action) => {
            state.gyms = action.payload;
        },
        setZipCode: (state, action) => {
            state.zipCode = action.payload;
        },
        setNumResults: (state, action) => {
            state.numResults = action.payload;
        },
        setLastSearchedZipCode: (state, action) => {
            state.lastSearchedZipCode = action.payload;
        },
        setLastSearchedNumResults: (state, action) => {
            state.lastSearchedNumResults = action.payload;
        },
    },
});

export const { setGyms, setZipCode, setNumResults, setLastSearchedZipCode, setLastSearchedNumResults } = gymsSlice.actions;
export default gymsSlice.reducer;