import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import "./style.css"
import Session from "./Account/Session";
import Posts from "./Posts";
import Home from "./Home";
import Search from "./Search";
import Users from "./Users";
import SearchLandingPage from "./Search/SearchLandingPage";
import GymPage from "./Search/GymPage";
import ProtectedRoute from "./ProtectedRoutes";

export default function ChalkTalk() {
    return (
        <Session>
            <div id="ct">
                <div className="ct-main-content-offset p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="/Home" />} />
                        <Route path="/Account/*" element={<Account />} />
                        <Route path="/Home/*" element={<Home />} />
                        <Route path="/Posts/*" element={<Posts />} />
                        <Route path="/Search" element={<Search />} />
                        <Route path="/Search/results/*" element={<SearchLandingPage />} />
                        <Route path="/Search/details/:gid" element={<GymPage />} />
                        <Route path="/Users/*" element={<ProtectedRoute page="Users"><Users /></ProtectedRoute>} />
                    </Routes>
                </div>
            </div>
        </Session>
    );
}
