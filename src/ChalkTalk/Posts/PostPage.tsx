import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import * as postClient from "./client";
import * as commentClient from "../Comments/client";
import * as likeClient from "./likesClient"
import { Link, Navigate, useNavigate } from "react-router";
import { FaTrash } from "react-icons/fa";
import PostPreview from "./PostPreview";
import Popup from "../Account/Popup";
import { FaRegComment } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineLike } from "react-icons/ai";
import { FaPencil } from "react-icons/fa6";
import { FormControl } from "react-bootstrap";


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

    type Like = {
        _id: string,
        postId: string,
        likedBy: string
    }

    const [posts, setPosts] = useState<Post[]>([]);
    const [comments, setComments] = useState<Comment[]>([]);
    const [likes, setLikes] = useState<Like[]>([]);

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

    const fetchLikes = async () => {
        const likes = await likeClient.getAllLikes();
        setLikes(likes);
    }

    useEffect(() => {
        fetchPosts();
    }, [currentUser, cat]);

    useEffect(() => {
        if (posts.length > 0) {
            fetchComments();
            fetchLikes();
        }
    }, [posts]);

    const [file, setFile] = useState<File | null>(null);
    const [showPreview, setShowPreview] = useState(false);
    const [previewURL, setPreviewURL] = useState<string>("");
    const [showSigninPopup, setShowSigninPopup] = useState(false);
    const [redirectToSignin, setRedirectToSignin] = useState(false);
    const [restriction, setRestriction] = useState("");
    const [editCommentCid, setEditCommentCid] = useState("");
    const [commentToEdit, setCommentToEdit] = useState("");
    const [captionToEdit, setCaptionToEdit] = useState("");
    const [editCaptionCid, setEditCaptionCid] = useState("");

    const handleAddPost = () => {
        if (currentUser) {
            const fileInput = document.getElementById("fileInput") as HTMLInputElement;
            fileInput?.click();
        } else {
            setRestriction("post in the " + cat + " thread");
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

        if (file.type.startsWith('image/')) {
            const post = {
                postedBy: currentUser._id,
                category: cat,
                caption: caption
            };

            const formData = new FormData();
            formData.append("image", file);
            formData.append("post", JSON.stringify(post));

            try {
                await postClient.uploadImage(formData);
                setShowPreview(false);
                setFile(null);
                console.log("Image uploaded successfully");
                fetchPosts();
            } catch (error) {
                console.error("Error uploading image:", error);
                alert("Failed to upload image. Please try again.");
            }
        } else {
            console.log("not an image");
        }

    };

    const handleDelete = async (pid: string) => {
        await postClient.deletePost(pid);
        fetchPosts();
    }

    const getCommentsForPost = (postId: string) => {
        return comments.filter(comment => comment.postId === postId);
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
    }

    const handleUnlike = async (pid: string, uid: string) => {
        await likeClient.unlike(pid, uid);
        fetchLikes();
    }

    const liked = (pid: string, uid: string) => {
        const num = likes.filter(like => like.likedBy === uid && like.postId === pid).length;
        return num !== 0;
    }

    const handleAddComment = async (pid: string) => {
        if (currentUser) {
            const comment = { _id: uuidv4(), postedBy: currentUser._id, postId: pid, comment: "" }
            await commentClient.createComment(comment);
            fetchComments();
            handleEditComment(comment as Comment);
        } else {
            setRestriction("comment on a post");
            setShowSigninPopup(true);
        }
    }

    const handleEditComment = async (comment: Comment) => {
        if (editCommentCid) {
            const updatedComment = { ...comment, comment: commentToEdit }
            await commentClient.updateComment(updatedComment);
            setEditCommentCid("");
            setCommentToEdit("");
            fetchComments();
        } else {
            setEditCommentCid(comment._id);
            setCommentToEdit(comment.comment);
        }
    }

    const handleEnterEditComment = async (comment: Comment) => {
        const updatedComment = { ...comment, comment: commentToEdit }
        await commentClient.updateComment(updatedComment);
        setEditCommentCid("");
        setCommentToEdit("");
        fetchComments();
    }

    const handleDeleteComment = async (cid: string) => {
        if (currentUser) {
            await commentClient.deleteComment(cid);
            fetchComments();
        }
    }

    const handleEnterEditCaption = async (post: Post) => {
        await postClient.updatePost(post._id, captionToEdit);
        setCaptionToEdit("");
        setEditCaptionCid("");
        fetchPosts();
    }

    const handleEditCaption = async (post: Post) => {
        if (currentUser && currentUser._id === post.postedBy) {
            setCaptionToEdit(post.caption);
            setEditCaptionCid(post._id);
        }
    }

    const handlePostClick = (post: Post) => {
        if (currentUser) {
            navigate(`/Posts/${post._id}`);
        } else {
            setRestriction("view this post");
            setShowSigninPopup(true);
        }
    }

    const navigate = useNavigate();

    return (
        <div className="ct-posts-container">
            <div className="header">
                {cat}
                <span className="add-post-button">
                    <Button onClick={handleAddPost}>
                        <label ><FaPlus /> Add a {cat} Post</label>
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
                                            <span onClick={() => handlePostClick(post)}>
                                                {post.img && <img src={post.img} width="400px" alt="Post" />}
                                            </span><br />
                                            <span>
                                                <Button
                                                    style={{ backgroundColor: currentUser && liked(post._id, currentUser._id) ? "rgb(164, 102, 182)" : "" }}
                                                    onClick={() => handleLike(post._id)}
                                                >
                                                    <AiOutlineLike /> Like
                                                </Button>
                                                <Button onClick={() => handleAddComment(post._id)}><FaRegComment /> Comment</Button>
                                                {currentUser && (currentUser._id === post.postedBy || currentUser.role === "ADMIN" || currentUser.role === "MOD") && <><Button onClick={() => handleDelete(post._id)} size="lg"><FaTrash /></Button></>}
                                                Likes: {likes.filter((like) => like.postId === post._id).length}
                                            </span>
                                            <br />
                                            <Link to={`/Account/Profile/${post.postedBy}`} key={post._id}> {post.username}</Link>:    {post._id !== editCaptionCid && (<label onClick={() => handleEditCaption(post)}>{post.caption}</label>)}
                                            {currentUser && currentUser._id === post.postedBy && post._id === editCaptionCid && (
                                                <FormControl defaultValue={captionToEdit} onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        handleEnterEditCaption(post);
                                                    }
                                                }} onChange={(e) => setCaptionToEdit(e.target.value)}></FormControl>
                                            )}
                                            <br />
                                            <label style={{ color: "#666666" }}>
                                                Posted at {new Date(post.createdAt).toLocaleString('en-US', { hour12: true }).replace(',', '')} <br />
                                            </label>
                                        </div>
                                    </td>
                                    <td className="ct-comment-cell">
                                        {getCommentsForPost(post._id).map((comment) => (
                                            <div key={comment._id}>
                                                <label>
                                                    <Link to={`/Account/Profile/${comment.postedBy}`}>{comment.username}</Link>: {comment._id !== editCommentCid ? comment.comment : null}
                                                </label>
                                                {currentUser && currentUser._id === comment.postedBy && comment._id === editCommentCid && (
                                                    <FormControl defaultValue={commentToEdit} onKeyDown={(e) => e.key === 'Enter' && handleEnterEditComment(comment)} onChange={(e) => setCommentToEdit(e.target.value)}></FormControl>
                                                )}
                                                {currentUser && currentUser._id === comment.postedBy &&
                                                    <Button variant="outline-secondary"
                                                        className="px-2 py-1" size="lg" onClick={() => handleEditComment(comment)}>
                                                        {editCommentCid !== comment._id && <FaPencil className="me-1" />}
                                                        {editCommentCid === comment._id ? "Done" : "Edit"}
                                                    </Button>}
                                                {currentUser && (currentUser._id === comment.postedBy || currentUser.role === "ADMIN" || currentUser.role === "MOD") && (
                                                    <Button variant="outline-danger" className="ms-2" onClick={() => handleDeleteComment(comment._id)}>
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
            {file && (
                <div>
                    <h4>File Selected: {file.name}</h4>
                </div>
            )}
            {showPreview && file && <PostPreview selectNewFile={handleAddPost} file={file} previewURL={previewURL} onCancel={previewOnCancel} onPost={handlePostFromPreview} />}
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