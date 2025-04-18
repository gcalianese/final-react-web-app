import { FormControl } from "react-bootstrap";
import { useState } from "react";

type PostPreviewProps = {
    previewURL: string;
    onCancel: () => void;
    onPost: (caption: string) => void;
};

export default function PostPreview({ previewURL, onCancel, onPost }: PostPreviewProps) {

    const handlePostClick = () => {
        onPost(caption);
    };

    const [caption, setCaption] = useState("");


    return (
        previewURL && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h5>Post Preview</h5>
                    <img src={previewURL} alt="Preview" /> <br />

                    <FormControl
                        as="textarea"
                        placeholder="Caption"
                        defaultValue={caption}
                        className="ct-caption-textarea mb-2"
                        onChange={(e) => setCaption(e.target.value)}
                    />

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