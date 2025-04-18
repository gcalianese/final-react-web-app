import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import * as postClient from "./client";
import { Link, Navigate } from "react-router";
import { FaTrash } from "react-icons/fa";
import PostPreview from "./PostPreview";
import Popup from "../Account/Popup";

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const POSTS_API = `${REMOTE_SERVER}/api/posts`;

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

    const [posts, setPosts] = useState<Post[]>([]);

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

    useEffect(() => {
        fetchPosts();
    }, [currentUser, cat]);

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
                {posts && (
                    <div className="posts">
                        {posts.map((post) => (
                            <div key={post._id} className="border post">
                                <br />
                                {post.img && <img src={`${REMOTE_SERVER}/${post.img}`} width="400px" alt="Post" />}
                                {currentUser && (currentUser.role === "ADMIN" || post.postedBy === currentUser._id) && (
                                    <Button onClick={() => handleDelete(post._id)}><FaTrash /></Button>)}
                                <br />
                                <Link to={`/Account/Profile/${post.postedBy}`} key={post._id}>
                                    {post.username}
                                </Link>
                                <label>{post.caption}</label>
                            </div>
                        ))}
                    </div>
                )}
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
            {redirectToSignin && <Navigate to="/Account/Signin"/>}
        </div>
    );
}