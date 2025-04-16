import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { PiHouseLineFill } from "react-icons/pi";
import { FaBell } from "react-icons/fa6";


export default function NavBar() {
    const { pathname } = useLocation();
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    // Users still have access even when not logged in
    const links = currentUser
        ? [
            { label: "Home", path: "/Rocks/Home", icon: PiHouseLineFill },
            { label: "My Profile", path: `/Rocks/Account/Profile`, icon: FaRegCircleUser },
            { label: "Sends", path: "/Rocks/Home/Sends", icon: AiOutlineDashboard },
            { label: "Gyms", path: "/Rocks/Home/Gyms", icon: AiOutlineDashboard },
            { label: "Gear", path: "/Rocks/Home/Gear", icon: AiOutlineDashboard },
            { label: "Fit/Tech", path: "/Rocks/Home/FT", icon: AiOutlineDashboard },
        ]
        : [
            { label: "Home", path: "/Rocks/Home", icon: PiHouseLineFill },
            { label: "Sends", path: "/Rocks/Home/Sends", icon: AiOutlineDashboard },
            { label: "Gyms", path: "/Rocks/Home/Gyms", icon: AiOutlineDashboard },
            { label: "Gear", path: "/Rocks/Home/Gear", icon: AiOutlineDashboard },
            { label: "Fit/Tech", path: "/Rocks/Home/FT", icon: AiOutlineDashboard },
            { label: "Signin", path: "/Rocks/Account/Signin", icon: AiOutlineDashboard },
            { label: "Signup", path: "/Rocks/Account/Signup", icon: AiOutlineDashboard },
        ];

    return (
        <div className="nav-bar">
            <ListGroup id="rocks-navigation"
                className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2" >
                <ListGroup.Item key="rocks-logo" className="rocks-logo-container">
                    <label className="rocks-logo-text">ChalkTalk</label>
                    {currentUser && <><br /><br /> <label className="rocks-logo-text">Welcome, {currentUser.firstName}</label></>}
                </ListGroup.Item>
                {
                    links.map((link) => (
                        <ListGroup.Item key={link.label} as={Link} to={link.path} className="nav-link-container">
                            <span className="nav-link-text">{link.label}  <link.icon /> </span><br /><br />
                        </ListGroup.Item>
                    ))}
            </ListGroup>
        </div>
    );
}
