import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import * as postClient from "../Home/Post/client"
import { Link } from "react-router";

export default function Sends() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    type Post = {
        _id: string;
        postedBy: string;
        username: string;
        category: "SENDS" | "GYMS" | "GEAR" | "FT"; // Enum for category
        img: string;
        caption: string;
        likedBy: string[]; // Array of user IDs (string)
        createdAt: Date;
        updatedAt: Date;
    };

    const [sends, setSends] = useState<Post[]>([]);

    const fetchSends = async () => {
        if (!currentUser) {
            const sends = await postClient.getAllSends();
            setSends(sends);
        } else {
            const sends = await postClient.getSendsForUser(currentUser._id as string);
            setSends(sends);
        }
    }

    useEffect(() => {
        fetchSends();
    }, []);

    return (
        <div className="rocks-sends-container">
            <h1>Sends</h1>
            <div className="rocks-sends-posts d-flex justify-content-center">
                {sends && (
                    <div className="posts">
                        {sends.map(send => (
                            <div key={send._id} className="border post">
                                {send.img && (
                                    <img src={send.img} width="400px" alt="Post" />
                                )}
                                <br />
                                <Link to={`/Rocks/Account/Profile/${send.postedBy}`} key={send._id}>{send.username}</ Link>
                                <label>{send.caption}</label>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}