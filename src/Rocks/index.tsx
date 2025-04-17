import { Routes, Route, Navigate } from "react-router";
import Home from "./Home";
import Account from "./Account";
import "./style.css"
import NavBar from "./NavBar";
import Session from "./Account/Session";
import Posts from "./Posts";

export default function Rocks() {
    return (
        <Session>
            <div id="rocks">
                <NavBar />
                <div className="rocks-main-content-offset p-3">

                    <Routes>
                        <Route path="/" element={<Navigate to="/Rocks/Home" />} />
                        <Route path="/Account/*" element={<Account />} />
                        <Route path="/Home/*" element={<Home />}></Route>
                        <Route path="/Posts/*" element={<Posts />}></Route>
                    </Routes>
                </div>
            </div>
        </Session>
    );
}
