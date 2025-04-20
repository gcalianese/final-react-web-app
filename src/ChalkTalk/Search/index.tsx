import { useState } from "react";
import SearchControls from "./SearchControl";
import SearchResults from "./SearchResults";

export default function Search() {
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

    const [gyms, setGyms] = useState<Gym[]>([]);

    return (
        <div id="ct-search-page">
            <h1>Find Gyms Near You</h1>
            <SearchControls setGyms={setGyms} />
            <SearchResults gyms={gyms} />
        </div>
    );
}