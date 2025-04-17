import { Routes, Route, Navigate } from "react-router";
import SearchPage from "./SearchPage";

export default function Search() {

    return (
        <div>
            <h1>Search</h1>
            <div className="p-3">
                <Routes>
                    <Route path="/" element={<Navigate to="/Search" />} />
                    <Route path="/Search/*" element={< SearchPage />}></Route>
                </Routes>
            </div>
        </div>
    );
}