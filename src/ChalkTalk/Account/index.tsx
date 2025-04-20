import { Routes, Route, Navigate } from "react-router";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import ProtectedRoute from "../ProtectedRoutes";

export default function Account() {
    return (
        <div id="ct-account">
            < div id="ct-account-routes">
                <Routes>
                    <Route path="/" element={<Navigate to="/Account/Signin" />} />
                    <Route path="/Signin" element={< Signin />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/Profile/:cid" element={<Profile />} />
                    <Route path="/Profile" element={<ProtectedRoute page="Profile"><Profile /></ProtectedRoute>} />
                </Routes>
            </div>
        </div>


    );
}