import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import "./style.css"
import Session from "./Account/Session";
import Posts from "./Posts";
import Home from "./Home";

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
                    </Routes>
                </div>
            </div>
        </Session>
    );
}
