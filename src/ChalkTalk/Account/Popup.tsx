type PopupProps = {
    restriction: string; // Pass in the restricted action to print out in the message
    onClose: () => void;
    onSignIn: () => void;
};

export default function Popup({restriction, onClose, onSignIn}: PopupProps) {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3>You must sign in to {restriction}.</h3>
                <div className="popup-buttons">
                    <button className="popup-btn cancel" onClick={onClose}>
                        Don't Sign In
                    </button>
                    <button className="popup-btn confirm" onClick={onSignIn}>
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};