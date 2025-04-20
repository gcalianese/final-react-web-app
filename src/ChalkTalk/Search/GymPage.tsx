import { useParams } from "react-router";

export default function GymPage() {
    const { gid } = useParams();

    return (
        <div id="ct-search-page">
            <h1>Welcome to gym page for {gid} </h1>
        </div>
    );
}