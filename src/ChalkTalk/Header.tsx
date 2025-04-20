import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { TbArrowBackUp } from "react-icons/tb";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";
import { LuLogIn } from "react-icons/lu";

export default function MainPageHeader() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const navigate = useNavigate();

    return (
        <div className="d-none d-md-block">
            <div className="ct-header d-flex justify-content-between">
                <TbArrowBackUp className="ct-header-back-arrow" onClick={(_) => (navigate(-1))} />
                {currentUser ?
                    <Button className="ct-header-profile me-1" onClick={(_) => (navigate(`/Account/Profile`))}>
                        {currentUser.firstName} <FaRegCircleUser />
                    </Button>
                    :
                    <div>
                    <Button className="ct-header-profile me-1" onClick={(_) => (navigate(`/Account/Signup`))}>
                        Sign Up <IoMdPersonAdd />
                    </Button>
                    <Button className="ct-header-profile me-1" onClick={(_) => (navigate(`/Account/Signin`))}>
                        Log In <LuLogIn />
                    </Button>
                    </div>
                }
            </div>
        </div>
    );
}
