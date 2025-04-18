import { Routes, Route, Navigate } from "react-router";
import PostPage from "./PostPage";

export default function Posts() {

    return (
        <div>
            <div className="p-3">
                <Routes>
                    <Route path="/" element={<Navigate to="/Posts/Sends" />} />
                    <Route path="/Sends" element={<PostPage cat={"SENDS"} />} />
                    <Route path="/Gear" element={<PostPage cat={"GEAR"} />}/>
                    <Route path="/FT" element={<PostPage cat={"FT"} />}/>
                </Routes>
            </div>
        </div>
    );
}