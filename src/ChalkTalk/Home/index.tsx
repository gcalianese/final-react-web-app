import { Routes, Route, Navigate } from "react-router";
import HomePage from "./HomePage";

export default function Home() {

    return (
        <div>
            <div className="p-3">
                <Routes>
                    <Route path="/" element={<Navigate to="/Home" />} />
                    <Route path="/Home" element={<HomePage />}></Route>
                </Routes>
            </div>
        </div>
    );
}