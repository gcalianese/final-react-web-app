import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import * as accountClient from "./client"
import * as accountReducer from "./reducer"
import * as postClient from "../Posts/client"
import { FaRegCircleUser } from "react-icons/fa6";
import { Button, FormControl, ListGroup } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import "./profileStyle.css";
import { v4 as uuidv4 } from "uuid";
import ChalkersPopup from "./ChalkersPopup";
import Popup from "./Popup";


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

type Post = {
    _id: string;
    postedBy: string;
    username: string;
    category: "SENDS" | "GEAR" | "FT";
    img: string;
    caption: string;
    likedBy: string[];
    createdAt: Date;
    updatedAt: Date;
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
    const [userPosts, setUserPosts] = useState<Post[]>([]);
    const [edit, setEdit] = useState(false);
    const [editedUser, setEditedUser] = useState<User>(defaultUser);
    const [followings, setFollowings] = useState<Following[]>([]);
    const [showSigninPopup, setShowSigninPopup] = useState(false);

    const [displayChalkers, setDisplayChalkers] = useState<boolean>(false);

    const signout = async () => {
        await accountClient.signout();
        dispatch(accountReducer.setCurrentUser(null));
        navigate("/Home", { replace: true });
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
            }
            fetchInfo();
        }
    }

    const handlePreviewClick = (pid: string) => {
        if (currentUser) {
            navigate(`/Posts/${pid}`)
        } else {
            setShowSigninPopup(true);
        }
    }

    return (
        <div className="ct-profile-container">
            {/* Popup for followers/following */}
            {displayChalkers && <ChalkersPopup userFollowers={userFollowers} userFollowing={userFollowing} closePopup={() => (setDisplayChalkers(!displayChalkers))} />}

            {/* Header to edit username */}
            <h1>
                <FaRegCircleUser /> {userProfile.username} {(!hasCid || (currentUser && currentUser.role === "ADMIN")) && !edit && <FaPencil onClick={() => setEdit(true)} />} {edit && <FaCheck onClick={handleEnter} />}
                {/* Follow/unfollow other users */}
                {currentUser && currentUser._id !== userProfile._id &&
                    <Button className="ct-btn ms-1" onClick={() => handleFollowingButton(userProfile._id, currentUser._id)}>
                        {follows(userProfile._id, currentUser._id) ? "Unfollow" : "Follow"}
                    </Button>} <br />
            </h1>
            <span className="ct-text-dark-purple" onClick={(_) => (setDisplayChalkers(!displayChalkers))}>
                {userFollowers.length} {userFollowers.length == 1 ? "follower" : "followers"} | {userFollowing.length} following
            </span>
            <br />

            <ListGroup className="ct-profile-table">
                <ListGroup.Item>
                    {/* First name */}
                    <label htmlFor="ct-firstname-id"><b>First Name:</b></label><br />
                    {/* Not editing */}
                    {!edit && <span>{userProfile.firstName}</span>}
                    {/* Editing */}
                    {edit && <FormControl id="ct-firstname-id" defaultValue={editedUser.firstName} onKeyDown={(e) => e.key === 'Enter' && handleEnter()} onChange={(e) => setEditedUser({ ...editedUser, firstName: e.target.value })} />}
                </ListGroup.Item>

                {currentUser && <>
                    <ListGroup.Item>
                        {/* Last name*/}
                        <label htmlFor="ct-lastname-id"><b>Last Name:</b></label><br />
                        {/* Not editing */}
                        {!edit && <span>{userProfile.lastName}</span>}
                        {/* Editing */}
                        {edit && <FormControl id="ct-lastname-id" defaultValue={editedUser.lastName} onKeyDown={(e) => e.key === 'Enter' && handleEnter()} onChange={(e) => setEditedUser({ ...editedUser, lastName: e.target.value })} />}
                    </ListGroup.Item>
                </>}

                <ListGroup.Item>
                    {/* Username, not editing */}
                    <label htmlFor="ct-username-id"><b>Username:</b></label><br />
                    {!edit && <span>{userProfile.username}</span>}
                    {/* Username, editing */}
                    {edit && <FormControl id="ct-username-id" defaultValue={editedUser.username} onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })} />}
                </ListGroup.Item>

                {!hasCid && (
                    <ListGroup.Item>
                        {/* Password */}
                        <span>
                        <label htmlFor="ct-password-id"><b>Password:</b></label><br />
                            {/* Not editing */}
                            {!edit && <span>{userProfile.password}</span>}
                            {/* Editing */}
                            {edit && <FormControl id="ct-password-id" defaultValue={editedUser.password} onKeyDown={(e) => e.key === 'Enter' && handleEnter()} onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })} />}
                        </span>

                    </ListGroup.Item>
                )}

                {currentUser && <>
                    <ListGroup.Item>
                        {/* Role */}
                        <label htmlFor="ct-role-id"><b>Role:</b></label><br />
                        {/* Not admin or not editing */}
                        {(currentUser.role !== "ADMIN" || !edit) && <span>{userProfile.role}</span>}

                        {/* Admin and editing */}
                        {currentUser.role === "ADMIN" && edit && (
                            <select id="ct-role-id" value={editedUser.role} onKeyDown={(e) => e.key === 'Enter' && handleEnter()} onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value as UserType })}
                                className="form-select float-start w-25 wd-select-role">
                                <option value="ADMIN">ADMIN</option>
                                <option value="MOD">MOD</option>
                                <option value="USER">USER</option>
                            </select>
                        )}
                    </ListGroup.Item>
                </>}

                {currentUser &&
                    <ListGroup.Item>
                        {/* Email */}
                        <span>
                        <label htmlFor="ct-email-id"><b>Email:</b></label><br />
                            {/* Not editing */}
                            {!edit && <span>{userProfile.email}</span>}
                            {/* Not editing */}
                            {edit && <FormControl id="ct-email-id" defaultValue={editedUser.email} onKeyDown={(e) => e.key === 'Enter' && handleEnter()} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} />}
                        </span>
                    </ListGroup.Item>
                }

                {(!hasCid || (currentUser && currentUser.role === "ADMIN")) && (
                    <ListGroup.Item>
                        {/* Phone number */}
                        {/* If in your pfp or admin */}
                        <span>
                        <label htmlFor="ct-phone-id"><b>Phone Number:</b></label><br />
                            {/* Not editing */}
                            {!edit && <span>{userProfile.phoneNumber}</span>}
                            {/* Editing */}
                            {edit && <FormControl id="ct-phone-id" defaultValue={editedUser.phoneNumber} onKeyDown={(e) => e.key === 'Enter' && handleEnter()} onChange={(e) => setEditedUser({ ...editedUser, phoneNumber: e.target.value })} />}
                        </span>
                    </ListGroup.Item>
                )}

                {currentUser &&
                    <ListGroup.Item>
                        {/* Home gym */}
                        <span>
                        <label htmlFor="ct-homegym-id"><b>Home Gym:</b></label><br />
                            {/* Not editing */}
                            {!edit && <span>{userProfile.homeGym}</span>}
                            {/* Editing */}
                            {edit && <FormControl id="ct-homegym-id" defaultValue={editedUser.homeGym} onKeyDown={(e) => e.key === 'Enter' && handleEnter()} onChange={(e) => setEditedUser({ ...editedUser, homeGym: e.target.value })} />}
                        </span>
                    </ListGroup.Item>
                }

                <ListGroup.Item>
                    {/* Number of posts */}
                    <b>Activity:</b> <br />
                    {userPosts.length} {userPosts.length == 1 ? "post" : "posts"}
                </ListGroup.Item>
            </ListGroup>

            <br />
            {!edit &&
                <><div className="mb-4">
                    {userPosts.map((post) => (
                        post.img ? <img key={post._id} src={post.img} width="100px" alt="Post preview" style={{ cursor: 'pointer' }} onClick={() => handlePreviewClick(post._id)} /> : null
                    ))}
                </div>
                </>}
            {!hasCid && !edit && (
                <Button onClick={signout} className="w-100 mb-2 ct-btn">
                    Sign out
                </Button>
            )}
            {edit && (
                <Button onClick={handleCancel} className="w-100 mb-2 ct-btn">
                    Cancel edits
                </Button>
            )}
            {showSigninPopup && (
                <Popup
                    restriction={"view this post"}
                    onClose={() => setShowSigninPopup(false)}
                    onSignIn={() => {
                        setShowSigninPopup(false);
                        navigate("/Account/Signin");
                    }}
                />
            )}
        </div>
    );
}