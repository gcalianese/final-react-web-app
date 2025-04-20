import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import * as accountClient from "./client"
import * as accountReducer from "./reducer"
import * as postClient from "../Posts/client"
import { FaRegCircleUser } from "react-icons/fa6";
import { Button, FormControl } from "react-bootstrap";
import { Link } from "react-router";
import { FaPencil } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import "./profileStyle.css";
import { v4 as uuidv4 } from "uuid";
import { RxCross2 } from "react-icons/rx";


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

export enum UserType {
    ADMIN = "ADMIN",
    USER = "USER"
}

const defaultUser: User = {
    _id: "defaultId",
    username: "defaultUsername",
    password: "defaultPassword",
    firstName: "defaultFirstName",
    email: "defaultEmail",
    phoneNumber: "defaultPhoneNumber",
    lastName: "defaultLastName",
    role: "USER",
    loginId: "defaultLoginId",
    homeGym: "defaultHomeGym",
    followerCount: "0",
    followingCount: "0",
    postCount: "0",
};

type Following = {
    _id: string,
    followed: string,
    follower: string,
}

export default function Profile() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const hasCid = Boolean(cid);

    const [userProfile, setUserProfile] = useState<User>(defaultUser);
    const [userFollowers, setUserFollowers] = useState<User[]>([]);
    const [userFollowing, setUserFollowing] = useState<User[]>([]);
    const [userPosts, setUserPosts] = useState<User[]>([]);
    const [edit, setEdit] = useState(false);
    const [editedUser, setEditedUser] = useState<User>(defaultUser);
    const [followings, setFollowings] = useState<Following[]>([]);

    const signout = async () => {
        await accountClient.signout();
        dispatch(accountReducer.setCurrentUser(null));
        navigate("/Home");
    }

    const fetchInfo = async () => {
        if (hasCid) {
            if (currentUser && currentUser._id === cid) {
                navigate("/Account/Profile");
            }
            const user = await accountClient.getUserById(cid as string);
            setUserProfile(user);
            setEditedUser(user);
            const followers = await accountClient.getUsersFollowing(cid as string);
            setUserFollowers(followers);
            const following = await accountClient.getUsersFollowedBy(cid as string);
            setUserFollowing(following)
            const posts = await postClient.getAllPostsBy(cid as string);
            setUserPosts(posts);
        } else if (currentUser) {
            const user = await accountClient.getUserById(currentUser._id as string);
            setUserProfile(user);
            setEditedUser(user);
            const followers = await accountClient.getUsersFollowing(currentUser._id as string);
            setUserFollowers(followers);
            const following = await accountClient.getUsersFollowedBy(currentUser._id as string);
            setUserFollowing(following)
            const posts = await postClient.getAllPostsBy(currentUser._id);
            setUserPosts(posts);
        }
        const allFollowings = await accountClient.getAllFollowings();
        setFollowings(allFollowings);
    }

    useEffect(() => {
        fetchInfo();
    }, [cid, currentUser]);

    const handleEnter = async () => {
        await accountClient.updateUser(editedUser);
        setEdit(false);
        fetchInfo();
    }

    const handleCancel = async () => {
        fetchInfo();
        setEdit(false);
    }

    // Checks if the user with uid follows the user with fid
    const follows = (fid: string, uid: string) => {
        if (followings) {
            return followings.some(f => f.followed === fid && f.follower === uid);
        }
    }

    const handleFollowingButton = async (fid: string, uid: string) => {
        if (currentUser) {
            if (follows(fid, uid)) {
                await accountClient.deleteFollowing(fid, uid);
            } else {
                const following = { _id: uuidv4(), followed: fid, follower: uid };
                await accountClient.addFollowing(following);
                console.log("FOLLOWINGS: " + JSON.stringify(followings))
            }
            fetchInfo();
        }
    }

    return (
        <div className="ct-profile-container">
            <h1><FaRegCircleUser /> {userProfile.username} {(!hasCid || (currentUser && currentUser.role === "ADMIN")) && !edit && <FaPencil onClick={() => setEdit(true)} />}{edit && <FaCheck onClick={handleEnter} />}</h1>
            {currentUser && currentUser._id !== userProfile._id && <Button onClick={() => handleFollowingButton(userProfile._id, currentUser._id)}>{follows(userProfile._id, currentUser._id) ? <><RxCross2 /> Unfollow</> : <><FaPlus /> Follow</>}</Button>} <br />

            First Name: {!edit && <>{userProfile.firstName}</>}
            {edit && <><FormControl defaultValue={editedUser.firstName} onKeyDown={(e) => e.key === 'Enter' && handleEnter()} onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })} /></>}<br />
            {currentUser && <> Last Name: {!edit && <>{userProfile.lastName}</>}{edit && <><FormControl defaultValue={editedUser.lastName} onKeyDown={(e) => e.key === 'Enter' && handleEnter()} onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })} /></>}
                <br /></>}
            Username: {!edit && userProfile.username} {edit && <><FormControl defaultValue={editedUser.username} onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })} /></>}
            <br />
            {!hasCid && (
                <>
                    Password: {!edit && userProfile.password}{edit && <><FormControl defaultValue={editedUser.password} onKeyDown={(e) => e.key === 'Enter' && handleEnter()} onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })} /></>}<br />
                </>
            )}
            {currentUser && <>
                Role: {(currentUser.role !== "ADMIN" || !edit) && userProfile.role}
                {currentUser.role === "ADMIN" && edit && (
                    <select value={editedUser.role} onKeyDown={(e) => e.key === 'Enter' && handleEnter()} onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value as UserType })}
                        className="form-select float-start w-25 wd-select-role">
                        <option value="ADMIN">ADMIN</option>
                        <option value="MOD">MOD</option>
                        <option value="USER">USER</option>
                    </select>
                )}
                <br />
            </>}
            {currentUser && <>Email: {!edit && userProfile.email}{edit && <><FormControl defaultValue={editedUser.email} onKeyDown={(e) => e.key === 'Enter' && handleEnter()} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} /> </>}<br /></>}
            {(!hasCid || (currentUser && currentUser.role === "ADMIN")) && (
                <>                    Phone Number: {!edit && userProfile.phoneNumber}{edit && <><FormControl defaultValue={editedUser.phoneNumber} onKeyDown={(e) => e.key === 'Enter' && handleEnter()} onChange={(e) => setEditedUser({ ...editedUser, phoneNumber: e.target.value })} /> </>}<br />
                </>
            )}
            {currentUser && <> Home Gym: {!edit && userProfile.homeGym}{edit && <><FormControl defaultValue={editedUser.homeGym} onKeyDown={(e) => e.key === 'Enter' && handleEnter()} onChange={(e) => setEditedUser({ ...editedUser, homeGym: e.target.value })} /> </>}<br /></>}
            Followers: {userFollowers.length}<br />
            {userFollowers.map((follower) => (
                <Link to={`/Account/Profile/${follower._id}`} key={`followedby-` + follower._id}>
                    {follower.username} <br />
                </Link>
            ))}
            Following: {userFollowing.length}<br />
            {userFollowing.map((follows) => (
                <Link to={`/Account/Profile/${follows._id}`} key={`follows-` + follows._id}>
                    {follows.username} <br />
                </Link>
            ))}
            Posts: {userPosts.length}<br />
            {!hasCid && !edit && (
                <Button onClick={signout} className="w-100 mb-2" id="wd-signout-btn">
                    Sign out
                </Button>
            )}
            {edit && (
                <Button onClick={handleCancel} className="w-100 mb-2" id="wd-signout-btn">
                    Cancel edits
                </Button>
            )}
        </div>
    );
}