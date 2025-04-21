import { useEffect } from "react";
import SearchControls from "./SearchControl";
import SearchResults from "./SearchResults";
import * as searchClient from "./client"
import { useSearchParams } from "react-router";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setGyms, setZipCode, setNumResults, setLastSearchedZipCode, setLastSearchedNumResults } from "./reducer";

export default function SearchLandingPage() {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const dispatch = useDispatch()

    const { lastSearchedZipCode, lastSearchedNumResults } = useSelector((state: any) => state.gymsReducer);

    const submitSearch = async (newZipCode: string, newNumResults: string) => {
        // Repeat query, don't need to do a new search
        if (newZipCode === lastSearchedZipCode && newNumResults === lastSearchedNumResults) {
            return;
        }

        // New query, set reducer values
        dispatch(setZipCode(newZipCode));
        dispatch(setNumResults(newNumResults));
        dispatch(setLastSearchedZipCode(newZipCode));
        dispatch(setLastSearchedNumResults(newNumResults));
        dispatch(setGyms(null));

        // Search api
        const response = await searchClient.getNearbyGyms(newZipCode, newNumResults);
        dispatch(setGyms(response));
    }

    useEffect(() => {
        const zc = searchParams.get("zc");
        const n = searchParams.get("n");

        submitSearch(zc!, n!);
      }, [location]);

    return (

        <div id="ct-search-page">
            <h1 className="ct-sign-header">Gyms Near You</h1>
            <SearchControls />
            <SearchResults />
        </div>
    );
}