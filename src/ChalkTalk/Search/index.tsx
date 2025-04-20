import { useEffect } from "react";
import SearchControls from "./SearchControl";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Search() {
    const navigate = useNavigate();

    const { lastSearchedZipCode, lastSearchedNumResults } = useSelector((state: any) => state.gymsReducer);

    useEffect(() => {
        if (lastSearchedZipCode != "") {
            navigate(`/Search/results?zc=${lastSearchedZipCode}&n=${lastSearchedNumResults}`);
        }
    }, []);

    return (
        <div id="ct-search-page">
            <h1>Find Gyms Near You</h1>
            <SearchControls  />
        </div>
    );
}