import { Routes, Route, Navigate } from "react-router";
import Sends from "../Posts/Sends";
import Gyms from "../Posts/Gyms";
import Gear from "../Posts/Gear";
import FT from "../Posts/FT";

export default function Home() {

    return (
        <div>
            <h1>Home</h1>
            <div className="p-3">
                <Routes>
                    <Route path="/" element={<Navigate to="/Rocks/Home" />} />
                    <Route path="/Home" element={<Home />}></Route>
                </Routes>
            </div>
        </div>
    );
}