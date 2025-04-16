import { Routes, Route, Navigate } from "react-router";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";

export default function Account() {
    return (
        <div id="rocks-account">
            < div id="rocks-account-routes">
                <Routes>
                    <Route path="/" element={<Navigate to="/Rocks/Account/Signin" />} />
                    <Route path="/Signin" element={< Signin />} />
                    <Route path="/Signup" element={<Signup />} />
                    <Route path="/Profile/:cid" element={<Profile />} />
                    <Route path="/Profile/*" element={<Profile />} />
                </Routes>
            </div>
        </div>


    );
}