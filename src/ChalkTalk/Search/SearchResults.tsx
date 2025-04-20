import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

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

export default function SearchResults() {
    const { gyms } = useSelector((state: any) => state.gymsReducer);

    return (
        <div id="ct-search-results d-flex">
            <ListGroup id="ct-gym-results-list"
                className="flex-fill">

                {gyms == null && (
                    <div>Loading...</div>
                )}

                {gyms != null && (
                    gyms.length === 0 ? (
                        <div>No results found.</div>
                    ) : (
                        gyms.map((gym: Gym) => (
                            <ListGroupItem id={`ct-${gym.id}-link`} key={gym.id} >
                                <Link to={`/Search/${gym.id}`} >
                                    {gym.name}
                                </Link>
                                {gym.website.includes("http") &&
                                    <Link to={gym.website} target="_blank" rel="noopener noreferrer" >
                                        <FaExternalLinkAlt />
                                    </Link>}
                                <br />
                            </ListGroupItem>
                        ))
                    )
                )}
            </ListGroup>
        </div>
    );
}