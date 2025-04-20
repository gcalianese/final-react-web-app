import { GoStar, GoStarFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../Account/Popup";
import * as accountClient from "../Account/client"
import { useNavigate } from "react-router";
import { setCurrentUser } from "../Account/reducer";

export default function PurpleStar({ gymId }: { gymId: string }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [showPopup, setShowPopup] = useState(false);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchFreshUser = async () => {
            if (currentUser._id) {
                const freshUser = await accountClient.getUserById(currentUser._id);
                dispatch(setCurrentUser(freshUser));
            }
        };

        fetchFreshUser();
    }, []);

    const toggleGymFavorite = async () => {
        let newUser = null;

        if (gymId && currentUser.favoritedGyms.includes(gymId)) {
            // Remove this gym from favorites
            newUser = { ...currentUser, favoritedGyms: currentUser.favoritedGyms.filter((g: any) => (g !== gymId)) };
        } else if (gymId) {
            // Add this gym to favorites
            newUser = { ...currentUser, favoritedGyms: [...currentUser.favoritedGyms, gymId] };
        }
        dispatch(setCurrentUser(newUser));
        await accountClient.updateUser(newUser);
    }

    return (
        <span>
            {/* // If there is a signed in user, make the fill of the star dependent on their favorites list */}
            {/* // Update their favorites list when clicking on it  */}
            {currentUser &&
                <span onClick={toggleGymFavorite} className="me-3 p-2 position-relative">
                    {currentUser.favoritedGyms.includes(gymId) ?
                        <GoStarFill className="ct-text-dark-purple" />
                        :
                        <GoStar className="ct-text-dark-purple" />
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