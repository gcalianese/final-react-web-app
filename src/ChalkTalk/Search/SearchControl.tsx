import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { FormControl } from "react-bootstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { setZipCode, setNumResults } from "./reducer";
import { useDispatch, useSelector } from "react-redux";

/*
{ submitSearch } : {
    submitSearch: (zc: string, n: string) => void;
}
*/

export default function SearchControls() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [searchParams] = useSearchParams();
    const { zipCode, numResults } = useSelector((state: any) => state.gymsReducer);

    const numSearchOptions = ["1", "5", "10"];

    const submitSearch = async () => {
        if (zipCode != "") {
            // Takes you to SearchLandingPage.tsx
            navigate(`/Search/results?zc=${zipCode}&n=${numResults}`);
        }
    }

    useEffect(() => {
        const zc = searchParams.get("zc");
        const n = searchParams.get("n");

        if (zc && zc.length <= 5) {
            setZipCode(zc);
        }

        if (n && numSearchOptions.includes(n)) {
            setNumResults(n);
        }
    }, [location]);

    return (
        <div id="ct-search-controls" className="m-1 d-flex justify-content-center">
            <FormControl id="ct-zipcode-input" className="w-25 me-1"
                placeholder="Zipcode, eg. 02115"
                value={zipCode}  // Make it a controlled input
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        submitSearch();
                    }
                }}
                onChange={(e) => {
                    const newValue = e.target.value;
                    // Only update if the input is numeric and no more than 5 characters
                    if (/^\d{0,5}$/.test(newValue)) {
                        dispatch(setZipCode(newValue));
                    }
                }}
                maxLength={5}
            />
            <select value={numResults} onChange={(e) => dispatch(setNumResults(e.target.value))}
                id="ct-select-role" className="form-select gym-search-amt me-1" >
                {numSearchOptions.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>

            <Button onClick={() => submitSearch()} id="ct-search-gym-btn" className="btn flex-grow ct-button">
                Search for Gyms
            </Button>
            <br />
        </div>
    );
}