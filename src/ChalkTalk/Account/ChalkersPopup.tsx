import { Button } from "react-bootstrap";
import { Link } from "react-router";
import "./profileStyle.css";

type User = {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    email: string;
    phoneNumber: string;
    lastName: string;
    role: "ADMIN" | "MOD" | "USER";
    loginId: string;
    homeGym: string;
    followerCount: string;
    followingCount: string;
    postCount: string;
};

export default function ChalkersPopup({ userFollowers, userFollowing, closePopup }: {
    userFollowers: User[];
    userFollowing: User[];
    closePopup: () => void;
}) {

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="popup-scroll-container">
                    <div className="scroll-box">
                        <h5>Followers: <br/>{userFollowers.length}</h5>
                        {userFollowers.map((follower) => (
                            <Link to={`/Account/Profile/${follower._id}`} key={`followedby-${follower._id}`}>
                                {follower.username}
                                <br />
                            </Link>
                        ))}
                    </div>
                    <div className="scroll-box">
                        <h5>Following: <br/>{userFollowing.length}</h5>
                        {userFollowing.map((follows) => (
                            <Link to={`/Account/Profile/${follows._id}`} key={`follows-${follows._id}`}>
                                {follows.username}
                                <br />
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="popup-buttons">
                    <Button className="ct-btn" onClick={closePopup}>Close Popup</Button>
                </div>
            </div>
        </div>
    );
};