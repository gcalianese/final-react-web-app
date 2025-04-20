import { Button } from "react-bootstrap";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function SearchControls() {
    const navigate = useNavigate();

    const submitSearch = async () => {
        if (zip != "") {
            navigate(`results?zc=${zip}&n=${numResults}`);
        }
    }

    const [zip, setZip] = useState("");
    const [numResults, setNumResults] = useState("5");

    return (
        <div id="ct-search-controls" className="m-1 d-flex justify-content-center">
            <FormControl id="ct-zipcode-input" className="w-25 me-1"
                placeholder="Zipcode, eg. 02115"
                //defaultValue={zip}
                value={zip}  // Make it a controlled input
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        submitSearch();
                    }
                }}
                onChange={(e) => {
                    const newValue = e.target.value;
                    // Only update if the input is numeric and no more than 5 characters
                    if (/^\d{0,5}$/.test(newValue)) {
                        setZip(newValue);
                    }
                }}
                maxLength={5}
            />
            <select value={numResults} onChange={(e) => setNumResults(e.target.value)} id="ct-select-role"
                className="form-select gym-search-amt me-1" >
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="10">10</option>
            </select>

            <Button onClick={() => submitSearch()} id="ct-search-gym-btn" className="btn flex-grow ct-button">
                Search for Gyms
            </Button>
            <br />
        </div>
    );
}