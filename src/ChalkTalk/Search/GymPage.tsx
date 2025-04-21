import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import PurpleStar from "./PurpleStar";

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
            {gym == null ?
                <div>
                    <h1> Uh oh, gym page not found! </h1>
                    <div>
                        <span>
                            It looks like the gym page you were looking for does not exist. <br />
                            Please try searching again!
                        </span>
                    </div>
                </div>
                :
                <div>
                    <h1 className="ct-sign-header"> Details for {gym.name} <PurpleStar gymId={gym.id.toString()} /> </h1>
                    Gym Id: {gym.id} <br />
                    Gym coordinates: {gym.lon} (lon) x {gym.lat} (lat) <br />
                    Gym address: {gym.address.house} {gym.address.street} {gym.address.city} {gym.address.postcode} <br />
                    Gym website: {gym.website} <br />
                    {gym.website.includes("http") && <iframe src={gym.website} width="80%" height="550px"/>}
                </div>}
        </div>
    );
}