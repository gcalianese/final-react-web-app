import "./singlePostStyle.css";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Button, Col, FormControl, Row } from "react-bootstrap";
import { FaTrash, FaRegComment } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { FaPencil } from "react-icons/fa6";
import { Link, useParams } from "react-router";
import * as postClient from "./client";
import * as commentClient from "../Comments/client";
import * as likeClient from "./likesClient";
import Popup from "../Account/Popup";
import { v4 as uuidv4 } from "uuid";
import { Navigate } from "react-router";
import { useNavigate } from "react-router";
import { IoMdCheckmark } from "react-icons/io";
import { ImCheckmark } from "react-icons/im";

export default function SinglePostPage() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);

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

    type Comment = {
        _id: string;
        postedBy: string;
        username: string;
        postId: string;
        comment: string;
        createdAt: Date;
        updatedAt: Date;
    };

    type Like = {
        _id: string;
        postId: string;
        likedBy: string;
    };

    const [post, setPost] = useState<Post | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [likes, setLikes] = useState<Like[]>([]);
    const [showSigninPopup, setShowSigninPopup] = useState(false);
    const [redirectToSignin, setRedirectToSignin] = useState(false);
    const [restriction, setRestriction] = useState("");
    const [editCommentCid, setEditCommentCid] = useState("");
    const [commentToEdit, setCommentToEdit] = useState("");
    const [captionToEdit, setCaptionToEdit] = useState("");
    const [editCaptionCid, setEditCaptionCid] = useState("");

    const { pid } = useParams();

    const fetchPost = async () => {
        const post = await postClient.getPost(pid as string);
        setPost(post);
    };

    const fetchComments = async () => {
        const comments = await commentClient.getAllCommentsForPost(pid as string);
        setComments(comments);
    };

    const fetchLikes = async () => {
        const likes = await likeClient.getAllLikes();
        setLikes(likes);
    };

    useEffect(() => {
        fetchPost();
        fetchComments();
        fetchLikes();
    }, [currentUser, pid]);

    const handleDelete = async (pid: string) => {
        await postClient.deletePost(pid);
        navigate(-1);
    };

    const handleLike = async (pid: string) => {
        if (currentUser) {
            if (!liked(pid, currentUser._id)) {
                const like = { _id: uuidv4(), postId: pid, likedBy: currentUser._id };
                await likeClient.createLike(like);
                fetchLikes();
            } else {
                await handleUnlike(pid, currentUser._id);
            }
        } else {
            setRestriction("like a post");
            setShowSigninPopup(true);
        }
    };

    const handleUnlike = async (pid: string, uid: string) => {
        await likeClient.unlike(pid, uid);
        fetchLikes();
    };

    const liked = (pid: string, uid: string) => {
        return likes.some((like) => like.likedBy === uid && like.postId === pid);
    };

    const handleAddComment = async (pid: string) => {
        if (currentUser) {
            const comment = {
                _id: uuidv4(),
                postedBy: currentUser._id,
                username: currentUser.username,
                postId: pid,
                comment: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            await commentClient.createComment(comment);
            fetchComments();
            handleEditComment(comment as Comment);
        } else {
            setRestriction("comment on a post");
            setShowSigninPopup(true);
        }
    };

    const handleEditComment = async (comment: Comment) => {
        if (editCommentCid) {
            const updatedComment = { ...comment, comment: commentToEdit };
            await commentClient.updateComment(updatedComment);
            setEditCommentCid("");
            setCommentToEdit("");
            fetchComments();
        } else {
            setEditCommentCid(comment._id);
            setCommentToEdit(comment.comment);
        }
    };

    const handleEnterEditComment = async (comment: Comment) => {
        const updatedComment = { ...comment, comment: commentToEdit };
        await commentClient.updateComment(updatedComment);
        setEditCommentCid("");
        setCommentToEdit("");
        fetchComments();
    };

    const handleDeleteComment = async (cid: string) => {
        if (currentUser) {
            await commentClient.deleteComment(cid);
            fetchComments();
        }
    };

    const handleEnterEditCaption = async (post: Post) => {
        await postClient.updatePost(post._id, captionToEdit);
        setCaptionToEdit("");
        setEditCaptionCid("");
        fetchPost();
    }

    const handleEditCaption = async (post: Post) => {
        if (currentUser && currentUser._id === post.postedBy) {
            setCaptionToEdit(post.caption);
            setEditCaptionCid(post._id);
        }
    }

    const navigate = useNavigate();

    if (!post) return <div>Loading...</div>;





    return (
        <div id="single-post-container">
            <div className="">
                {/* Post & comments row */}
                <Row>
                    {/* Post image */}
                    <Col xs={4} className="ct-post-cell">
                        <div key={post._id}>
                            {/* Post time */}
                            <label className="ct-post-time d-flex p-1">
                                Posted at {" "}
                                {new Date(post.createdAt).toLocaleString("en-US", {
                                    hour12: true,
                                }).replace(",", "")}
                            </label>
                            {post.img && <img src={post.img} style={{ width: '100%', height: 'auto' }} alt="Post" />}<br />
                            {/* Username, caption, and buttons */}
                            <div className="ct-post-info">
                                {/* Username and caption */}
                                <span>
                                    {/* Caption */}
                                    <div className="ps-2 pe-2 pt-2  ">
                                        {post._id !== editCaptionCid && (
                                            <span onClick={() => handleEditCaption(post)}>
                                                {post.caption}
                                            </span>)}
                                    </div>
                                    {currentUser && currentUser._id === post.postedBy && post._id === editCaptionCid && (
                                        <FormControl defaultValue={captionToEdit} onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                handleEnterEditCaption(post);
                                            }
                                        }} onChange={(e) => setCaptionToEdit(e.target.value)}></FormControl>
                                    )}
                                </span>
                                <hr />
                                {/* Username & Buttons */}
                                <span className="d-flex justify-content-between">
                                    {/* Username */}
                                    <span className="ct-text-dark-purple ps-3 pt-1" onClick={() => { navigate(`/Account/Profile/${post.postedBy}`) }}>
                                        {post.username}
                                    </span>
                                    <div>
                                        <Button className="ct-like-comment-button" style={{
                                            backgroundColor:
                                                currentUser && liked(post._id, currentUser._id)
                                                    ? "rgb(164, 102, 182)"
                                                    : "",
                                        }}
                                            onClick={() => handleLike(post._id)}>
                                            <AiOutlineLike /> {likes.filter((like) => like.postId === post._id).length}
                                        </Button>
                                        <Button className="ct-like-comment-button" onClick={() => handleAddComment(post._id)}>
                                            <FaRegComment />
                                        </Button>
                                        {currentUser &&
                                            (currentUser._id === post.postedBy ||
                                                currentUser.role === "ADMIN" ||
                                                currentUser.role === "MOD") && (
                                                <Button onClick={() => handleDelete(post._id)} size="lg">
                                                    <FaTrash />
                                                </Button>
                                            )}
                                    </div>
                                </span>
                            </div>
                        </div>
                    </Col>
                    {/* Actual comments */}
                    <Col xs={8} className="ct-comment-cell">
                        {comments.map((comment) => (
                            // Extra div to have <hr />
                            <div>
                                <div key={comment._id} className="d-flex justify-content-between" >
                                    {/* Username and comment */}
                                    <span>
                                        <span>
                                            <span className="ct-text-dark-purple pe-3" onClick={() => { navigate(`/Account/Profile/${comment.postedBy}`) }}>
                                                {comment.username}
                                            </span>
                                            <br />
                                        </span>
                                    </span>

                                    {/* Buttons */}
                                    <span>
                                        {currentUser &&
                                            currentUser._id === comment.postedBy && (
                                                <Button
                                                    variant="outline-secondary"
                                                    className="px-2 py-1"
                                                    size="lg"
                                                    onClick={() => handleEditComment(comment)}>
                                                    {editCommentCid === comment._id
                                                        ? <ImCheckmark />
                                                        : <FaPencil />}
                                                </Button>
                                            )}
                                        {currentUser &&
                                            (currentUser._id === comment.postedBy ||
                                                currentUser.role === "ADMIN" ||
                                                currentUser.role === "MOD") && (
                                                <Button
                                                    variant="outline-danger"
                                                    className="ms-2"
                                                    onClick={() =>
                                                        handleDeleteComment(comment._id)
                                                    }>
                                                    <FaTrash />
                                                </Button>
                                            )}
                                    </span>
                                </div>
                                {/* Actual Comment */}
                                <div>
                                    {comment._id !== editCommentCid ? comment.comment : null}
                                    {currentUser &&
                                        currentUser._id === comment.postedBy &&
                                        comment._id === editCommentCid && (
                                            <FormControl
                                                defaultValue={commentToEdit}
                                                onKeyDown={(e) =>
                                                    e.key === "Enter" &&
                                                    handleEnterEditComment(comment)
                                                }
                                                onChange={(e) => setCommentToEdit(e.target.value)} />
                                        )}
                                </div>
                                <hr />
                            </div>
                        ))}

                    </Col>
                </Row>
            </div>

            {showSigninPopup && (
                <Popup
                    restriction={restriction}
                    onClose={() => setShowSigninPopup(false)}
                    onSignIn={() => {
                        setShowSigninPopup(false);
                        setRedirectToSignin(true);
                    }}
                />
            )}
            {redirectToSignin && <Navigate to="/Account/Signin" />}
        </div>
    );
}
