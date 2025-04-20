import { Routes, Route, Navigate } from "react-router";
import PostPage from "./PostPage";
import SinglePostPage from "./SinglePostPage";
import ProtectedRoute from "../ProtectedRoutes";

export default function Posts() {

    return (
        <div>
            <div className="p-3">
                <Routes>
                    <Route path="/" element={<Navigate to="/Posts/Sends" />} />
                    <Route path="/Sends" element={<PostPage cat={"SENDS"} />} />
                    <Route path="/Gear" element={<PostPage cat={"GEAR"} />}/>
                    <Route path="/FT" element={<PostPage cat={"FT"} />}/>
                    <Route path="/:pid" element={<ProtectedRoute page="spp">< SinglePostPage/></ProtectedRoute>}/>
                </Routes>
            </div>
        </div>
    );
}