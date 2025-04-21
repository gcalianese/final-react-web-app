import { FormControl } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./singlePostStyle.css"

type PostPreviewProps = {
    previewURL: string;
    onCancel: () => void;
    onPost: (caption: string) => void;
    file: File;
    selectNewFile: () => void;
};

export default function PostPreview({ previewURL, onCancel, onPost, file, selectNewFile }: PostPreviewProps) {
    const handlePostClick = () => {
        onPost(caption);
    };

    const [isImage, setIsImage] = useState(true);
    const [caption, setCaption] = useState("");

    useEffect(() => {
        if (file.type.startsWith('image/')) {
            setIsImage(true);
        } else {
            setIsImage(false);
        }
    }, [file]);

    return (
        previewURL && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h5>Post Preview</h5>
                    {isImage && <img src={previewURL} alt="Preview" />} <br />

                    <FormControl
                        as="textarea"
                        placeholder="Caption"
                        value={caption}
                        className="ct-caption-textarea mb-2"
                        onChange={(e) => setCaption(e.target.value)}
                    />
                    {!isImage && (
                        <>
                            <Button className="ct-btn" onClick={selectNewFile}>Select another file</Button>
                            <p><b>{previewURL}</b> is not an image.</p>
                        </>
                    )}

                    <div className="modal-buttons">
                        <button className="bg-danger text-white" onClick={() => {
                            if (previewURL) {
                                URL.revokeObjectURL(previewURL);
                            }
                            onCancel();
                        }}>  <b>Cancel</b></button>
                        <Button className="ct-btn" onClick={handlePostClick}>Post</Button>
                    </div>
                </div>
            </div>
        )
    );
}
