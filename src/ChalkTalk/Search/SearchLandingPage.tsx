import { useEffect, useState } from "react";
import SearchControls from "./SearchControl";
import SearchResults from "./SearchResults";
import * as searchClient from "./client"
import { useSearchParams } from "react-router";
import { useLocation } from "react-router-dom";

export default function SearchLandingPage() {
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

    const [gyms, setGyms] = useState<Gym[] | null>(null);

    const [searchParams] = useSearchParams();
    const location = useLocation();

    const submitSearch = async (zip: string, numResults: string) => {
        setGyms(null);
        const response = await searchClient.getNearbyGyms(zip, numResults);
        console.log("response: " + JSON.stringify(response));
        setGyms(response);
    }

    useEffect(() => {
        const zc = searchParams.get("zc");
        const n = searchParams.get("n");

        submitSearch(zc!, n!);
      }, [location]);

    return (

        <div id="ct-search-page">
            <h1>Gyms Near You</h1>
            <SearchControls />
            <SearchResults gyms={gyms} />
        </div>
    );
}