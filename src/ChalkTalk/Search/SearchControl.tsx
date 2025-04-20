import { Button } from "react-bootstrap";
import * as searchClient from "./client"
import { useState } from "react";
import { FormControl } from "react-bootstrap";

interface Gym {
    id: number;
    lat: number;
    lon: number;
    name: string;
    sport: string;
    address: {
        house: string,
        street: string,
        city: string,
        postcode: string,
    }
    website: string;
}

export default function SearchControls({ setGyms }:
    {
        setGyms: (gyms: Gym[]) => void
    }) {

    const submitSearch = async (zip: string) => {
        const response = await searchClient.getNearbyGyms(zip, numResults);
        console.log("response: " + JSON.stringify(response));
        setGyms(response);
    }

    const [zip, setZip] = useState("");
    const [numResults, setNumResults] = useState("5");

    return (
        <div id="ct-search-controls" className="m-1">
            <FormControl id="ct-zipcode-input" className="float-start w-25 me-1"
                placeholder="Zipcode, eg. 02115"
                //defaultValue={zip}
                value={zip}  // Make it a controlled input
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        submitSearch(zip);
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
                className="form-select w-25 float-center" >
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="10">10</option>
            </select>

            <Button onClick={() => submitSearch(zip)} id="ct-search-gym-btn" className="float-end btn flex-grow">
                Search for Gyms
            </Button>
            <br />
        </div>
    );
}