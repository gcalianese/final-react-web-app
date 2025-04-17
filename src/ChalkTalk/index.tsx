import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import "./style.css"
import NavBar from "./NavBar";
import Session from "./Account/Session";
import Posts from "./Posts";
import HomePage from "./Home/HomePage";

export default function ChalkTalk() {
    return (
        <Session>
            <div id="ct">
                <NavBar />
                <div className="ct-main-content-offset p-3">

                    <Routes>
                        <Route path="/" element={<Navigate to="/Home" />} />
                        <Route path="/Account/*" element={<Account />} />
                        <Route path="/Home/*" element={<HomePage />}></Route>
                        <Route path="/Posts/*" element={<Posts />}></Route>
                    </Routes>
                </div>
            </div>
        </Session>
    );
}
