import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import * as postClient from "./client";
import { Link } from "react-router";

export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const POSTS_API = `${REMOTE_SERVER}/api/posts`;

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

  // Fetch posts for user or all posts
  const fetchSends = async () => {
    if (!currentUser) {
      const sends = await postClient.getAllSends();
      setSends(sends);
    } else {
      const sends = await postClient.getSendsForUser(currentUser._id as string);
      setSends(sends);
    }
  };

  useEffect(() => {
    fetchSends();
  }, [currentUser]);

  // File handling state
  const [file, setFile] = useState<File | null>(null);

  // Trigger the file input click
  const handleButtonClick = () => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;
    fileInput?.click();
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile); // Set the file in the state
      console.log("Selected file:", selectedFile);
      handleSubmit(selectedFile); // Automatically submit once file is selected
    }
  };

  // Handle the image file upload
  const handleSubmit = async (selectedFile: File) => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(`${POSTS_API}/sends`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Image uploaded successfully:", response.data);
      alert("Image uploaded successfully!");
      fetchSends(); // Refresh sends after upload
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image. Please try again.");
    }
  };

  return (
    <div className="ct-sends-container">
      <div className="header">
        Sends
        <span className="add-send-button">
          <Button onClick={handleButtonClick}>
            <FaPlus /> Add a Send
          </Button>
        </span>
      </div>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }} // Hide the input element
        onChange={handleFileChange} // Handle file selection
      />
      <div className="ct-sends-posts d-flex justify-content-center">
        {sends && (
          <div className="posts">
            {sends.map((send) => (
              <div key={send._id} className="border post">
                {send.img && <img src={`${REMOTE_SERVER}/${send.img}`} width="400px" alt="Post" />}
                <br />
                <Link to={`/Account/Profile/${send.postedBy}`} key={send._id}>
                  {send.username}
                </Link>
                <label>{send.caption}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Display selected file info */}
      {file && (
        <div>
          <h4>File Selected: {file.name}</h4>
          {/* The upload happens automatically after selection */}
        </div>
      )}
    </div>
  );
}