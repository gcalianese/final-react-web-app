import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import * as accountClient from "./client"
import * as accountReducer from "./reducer"
import { FaRegCircleUser } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import { Link } from "react-router";

type User = {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    email: string;
    phoneNumber: string;
    lastName: string;
    dob: Date;
    role: "ADMIN" | "USER";
    loginId: string;
    homeGym: string;
    followerCount: string;
    followingCount: string;
    postCount: string;
};

const defaultUser: User = {
    _id: "defaultId",
    username: "defaultUsername",
    password: "defaultPassword",
    firstName: "defaultFirstName",
    email: "defaultEmail",
    phoneNumber: "defaultPhoneNumber",
    lastName: "defaultLastName",
    dob: new Date(),
    role: "USER",
    loginId: "defaultLoginId",
    homeGym: "defaultHomeGym",
    followerCount: "0",
    followingCount: "0",
    postCount: "0",
};

export default function Profile() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const hasCid = Boolean(cid);

    const [userProfile, setUserProfile] = useState<User>(defaultUser);
    const [userFollowers, setUserFollowers] = useState<User[]>([]);
    const [userFollowing, setUserFollowing] = useState<User[]>([]);

    const signout = async () => {
        await accountClient.signout();
        dispatch(accountReducer.setCurrentUser(null));
        navigate("/Rocks/Home");
    }

    const fetchUserProfile = async () => {
        if (!hasCid) return;
        const user = await accountClient.getUserById(cid as string);
        setUserProfile(user);
    }

    const fetchUserFollowers = async () => {
        if (hasCid) {
            const followers = await accountClient.getUsersFollowing(cid as string);
            setUserFollowers(followers);
            const following = await accountClient.getUsersFollowedBy(cid as string);
            setUserFollowing(following)
        } else {
            const followers = await accountClient.getUsersFollowing(currentUser._id as string);
            setUserFollowers(followers);
            const following = await accountClient.getUsersFollowedBy(currentUser._id as string);
            setUserFollowing(following)
        }
    }

    useEffect(() => {
        fetchUserProfile();
        fetchUserFollowers();
    }, [cid]);

    return (
        <div className="rocks-profile-container">
            <h1><FaRegCircleUser /> {userProfile.username}</h1>
            First Name: {userProfile.firstName}<br />
            Last Name: {userProfile.lastName}<br />
            Username: {userProfile.username}<br />
            {!hasCid && (
                <>
                    Password: {userProfile.password}<br />
                </>
            )}
            Role: {userProfile.role}<br />
            {!hasCid && (
                <>
                    Email: {userProfile.email}<br />
                    Phone Number: {userProfile.phoneNumber}<br />
                    Birthday: {userProfile.dob}<br />
                </>
            )}
            Home Gym: {userProfile.homeGym}<br />
            Followers: {userFollowers.length}<br />
            {userFollowers.map((follower) => (
                <Link to={`/Rocks/Account/Profile/${follower._id}`} key={`followedby-` + follower._id}>
                    {follower.username} <br />
                </Link>
            ))}
            Following: {userFollowing.length}<br />
            {userFollowing.map((follows) => (
                <Link to={`/Rocks/Account/Profile/${follows._id}`} key={`follows-` + follows._id}>
                    {follows.username} <br />
                </Link>
            ))}
            Posts: {userProfile.postCount}<br />
            {!hasCid && (
                <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
                    Sign out
                </Button>
            )}
        </div>
    );
}