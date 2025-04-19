import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import * as postClient from "./client";
import * as commentClient from "../Comments/client";
import { Link, Navigate } from "react-router";
import { FaTrash } from "react-icons/fa";
import PostPreview from "./PostPreview";
import Popup from "../Account/Popup";
import { FaRegComment } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineLike } from "react-icons/ai";
import { FaPencil } from "react-icons/fa6";


export default function PostPage({ cat }: { cat: string }) {
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

    const [posts, setPosts] = useState<Post[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);

    // Fetch posts for user if logged in or all posts if not
    const fetchPosts = async () => {
        if (!currentUser) {
            const posts = await postClient.getAllPostsForCat(cat);
            setPosts(posts);
        } else {
            const posts = await postClient.getPostsForUser(cat, currentUser._id);
            setPosts(posts);
        }
    };

    // Fetch comments for the retreived posts
    const fetchComments = async () => {
        const allComments = await Promise.all(
            posts.map((post) => commentClient.getAllCommentsForPost(post._id))
        );
        setComments(allComments.flat());
    };

    useEffect(() => {
        fetchPosts();
    }, [currentUser, cat]);

    useEffect(() => {
        if (posts.length > 0) {
            fetchComments();
        }
    }, [posts]);

    const [file, setFile] = useState<File | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [previewURL, setPreviewURL] = useState<string>("");
    const [showSigninPopup, setShowSigninPopup] = useState(false);
    const [redirectToSignin, setRedirectToSignin] = useState(false);

    const handleAddPost = () => {
        if (currentUser) {
            const fileInput = document.getElementById("fileInput") as HTMLInputElement;
            fileInput?.click();
        } else {
            setShowSigninPopup(true);
        }
    };

    // Handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            const preview = URL.createObjectURL(selectedFile);
            setPreviewURL(preview);
            setShowPreview(true);
        }
    };


    const previewOnCancel = () => {
        setPreviewURL("");
        setFile(null);
        setShowPreview(false);
    }

    // Handle the image file upload
    const handlePostFromPreview = async (caption: string) => {
        if (!file) return;
        const post = {
            postedBy: currentUser._id,
            category: cat,
            caption: caption
        };

        const formData = new FormData();
        formData.append("image", file);
        formData.append("post", JSON.stringify(post));

        try {
            postClient.uploadImage(formData);
            await fetchPosts();
            setShowPreview(false);
            setFile(null);
            console.log("Image uploaded successfully");
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image. Please try again.");
        }
    };

    const handleDelete = async (pid: string) => {
        await postClient.deletePost(pid);
        fetchPosts();
    }

    const createComment = async (pid: string) => {
        const comment = { _id: uuidv4(), postedBy: "234", postId: pid, comment: "I liked the old ones better!" }
        const newComment = await commentClient.createComment(comment);
    }

    const getCommentsForPost = (postId: string) => {
        return comments.filter(comment => comment.postId === postId);
    };

    return (
        <div className="ct-posts-container">
            <div className="header">
                {cat}
                <span className="add-post-button">
                    <Button onClick={handleAddPost}>
                        <FaPlus /> Add a {cat} Post
                    </Button>
                </span>
            </div>
            <input
                type="file"
                id="fileInput"
                style={{ display: "none" }} // Hide the input element
                onChange={handleFileChange}
            />
            <div className="ct-posts-posts d-flex justify-content-center">
                <table className="responsive-table">
                    <thead>
                        <tr>
                            <th className="posts-header">Posts</th>
                            <th className="comments-header">Comments</th>
                        </tr>
                    </thead>
                    <tbody>

                        {posts && (

                            <>                             {posts.map((post) => (
                                <tr>
                                    <td className="ct-post-cell">
                                        <div key={post._id} className="border post">
                                            <br />
                                            {post.img && <img src={post.img} width="400px" alt="Post" />}<br />
                                            <span>
                                                <Button><AiOutlineLike /> Like</Button>
                                                <Button><FaRegComment onClick={() => createComment(post._id)} /> Comment</Button>
                                                {currentUser && (currentUser._id === post.postedBy || currentUser.role === "ADMIN" || currentUser.role === "MOD") && <><Button onClick={() => handleDelete}><FaTrash /></Button></>}
                                            </span>
                                            <br />
                                            <Link to={`/Account/Profile/${post.postedBy}`} key={post._id}> {post.username}</Link>: <label>{post.caption}</label>
                                            <label style={{ color: "#666666" }}>
                                                Posted at {new Date(post.createdAt).toLocaleString('en-US', { hour12: true }).replace(',', '')} <br />
                                            </label>
                                        </div>
                                    </td>
                                    <td className="ct-comment-cell">
                                        {getCommentsForPost(post._id).map((comment) => (
                                            <div key={comment._id}>
                                                <label>
                                                    <Link to={`/Account/Profile/${comment.postedBy}`}>{comment.username}</Link>: {comment.comment}
                                                </label>
                                                {currentUser && currentUser._id === comment.postedBy && (
                                                    <Button variant="outline-secondary" size="sm">
                                                        <FaPencil /> Edit
                                                    </Button>
                                                )}
                                                {currentUser && (currentUser._id === comment.postedBy || currentUser.role === "ADMIN" || currentUser.role === "MOD") && (
                                                    <Button variant="outline-danger" size="sm" className="ms-2">
                                                        <FaTrash /> Delete
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                            </>
                        )}

                    </tbody>
                </table>
            </div>

            {/* TODO: Verify it's an image file before uploading */}
            {file && (
                <div>
                    <h4>File Selected: {file.name}</h4>
                </div>
            )}
            {showPreview && file && <PostPreview previewURL={previewURL} onCancel={previewOnCancel} onPost={handlePostFromPreview} />}
            {showSigninPopup && (
                <Popup
                    restriction={"post in the " + cat + " thread"}
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