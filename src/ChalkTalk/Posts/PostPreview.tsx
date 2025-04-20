import { FormControl } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

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
                            <Button onClick={selectNewFile}>Select another file</Button>
                            <p><b>{previewURL}</b> is not an image.</p>
                        </>
                    )}

                    <div className="modal-buttons">
                        <button onClick={() => {
                            if (previewURL) {
                                URL.revokeObjectURL(previewURL);
                            }
                            onCancel();
                        }}>Cancel</button>
                        <button onClick={handlePostClick}>Post</button>
                    </div>
                </div>
            </div>
        )
    );
}
