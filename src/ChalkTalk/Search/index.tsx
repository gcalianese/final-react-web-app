import { Button } from "react-bootstrap";
import * as searchClient from "./client"
import { useState } from "react";
import { FormControl } from "react-bootstrap";
import { Link } from "react-router";

export default function Search() {
    const submitSearch = async (zip: string) => {
        const response = await searchClient.getNearbyGyms(zip, numResults);
        console.log("response: " + JSON.stringify(response));
        setGyms(response);
    }

    interface Gym {
        id: number;
        lat: number;
        lon: number;
        name: string;
        sport: string;
        address : {
            house: string,
            street: string,
            city: string,
            postcode: string,
        }
        website: string;
    }

    const [gyms, setGyms] = useState<Gym[] | null>(null);
    const [zip, setZip] = useState("");
    const [numResults, setNumResults] = useState("5");

    return (
        <div>
            <h1>Find Gyms Near You</h1>
            <div className="p-3">
                <FormControl className="ct-zipcode-input"
                    placeholder="Zipcode, eg. 02115"
                    //defaultValue={zip}
                    value={zip}  // Make it a controlled input
                    onChange={(e) => {
                        const newValue = e.target.value;
                        // Only update if the input is numeric and no more than 5 characters
                        if (/^\d{0,5}$/.test(newValue)) {
                            setZip(newValue);
                        }
                    }}
                    maxLength={5} />
                <select value={numResults} onChange={(e) => setNumResults(e.target.value)}
                    className="form-select float-start w-25 wd-select-role" >
                    <option value="1">1</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>

                <Button onClick={() => submitSearch(zip)}>Search for Gyms</Button>
                <br />
                {gyms && (
                    <>
                        {gyms.length === 0 ? (
                            <div>No results found.</div>
                        ) : (
                            gyms.map((gym) => (
                                <div key={gym.id}>
                                    {gym.name} {gym.website.includes("http") && <Link to={gym.website} target="_blank" rel="noopener noreferrer" > - {gym.website}</Link>}
                                </div>
                            ))
                        )}
                    </>
                )}
            </div>
        </div>
    );
}