import { Routes, Route, Navigate } from "react-router";
import Sends from "./Sends";
import Gyms from "./Gyms";
import Gear from "./Gear";
import FT from "./FT";

export default function Posts() {

    return (
        <div>
            <div className="p-3">
                <Routes>
                    <Route path="/" element={<Navigate to="/Posts/Sends" />} />
                    <Route path="/Sends" element={<Sends />} />
                    <Route path="/Gyms" element={<Gyms />}/>
                    <Route path="/Gear" element={<Gear />}/>
                    <Route path="/FT" element={<FT />}/>
                </Routes>
            </div>
        </div>
    );
}