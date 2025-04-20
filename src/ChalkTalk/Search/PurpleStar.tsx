import { GoStar, GoStarFill } from "react-icons/go";
import { useState } from "react";
import { useSelector } from "react-redux";
import Popup from "../Account/Popup";
import { useNavigate } from "react-router";

export default function PurpleStar() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [test, setTest] = useState<boolean>(true);
    const [showPopup, setShowPopup] = useState(false);

    const navigate = useNavigate();

    return (
        <span>
            {/* // If there is a signed in user, make the fill of the star dependent on their favorites list */}
            {/* // Update their favorites list when clicking on it  */}
            {currentUser &&
                <span onClick={() => setTest(!test)} className="me-3 p-2 position-relative">
                    {test ?
                        <GoStar className="ct-text-dark-purple" />
                        :
                        <GoStarFill className="ct-text-dark-purple" />
                    }
                </span>
            }

            {showPopup && 
            <Popup restriction="favorite a gym" onClose={() => (setShowPopup(false))} onSignIn={() => (navigate("/Account/Signin"))} />}

            {/* // Else, only have an empty star and if the anonymous user tries to click it, */}
            {/* // give a sign in popup */}
            {!currentUser &&
                <span className="me-3 p-2 position-relative"
                    onClick={(_) => {
                        setShowPopup(true);
                    }}>
                    <GoStar className="ct-text-dark-purple" />
                </span>
            }
        </span>
    );
}