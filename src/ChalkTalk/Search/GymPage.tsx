import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";

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

export default function GymPage() {
    const { gid } = useParams();
    const { gyms } = useSelector((state: any) => state.gymsReducer);

    const [gym, setGym] = useState<Gym | null>(null);

    const location = useLocation();

    useEffect(() => {
        const foundGym = gyms.find((g: Gym) => (g.id).toString() === gid);
        setGym(foundGym);
    }, [location]);

    return (
        <div id="ct-search-page">
            <h1>Welcome to gym page </h1>
            {gym != null ? 
            <div> Gym Id: {gym!.id} </div>
            :
            <div> Gym not found </div>}
        </div>
    );
}