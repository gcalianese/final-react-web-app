import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { PiHouseLineFill } from "react-icons/pi";
import { HiMagnifyingGlass } from "react-icons/hi2";


export default function NavBar() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    // Users still have access even when not logged in
    const links = currentUser
        ? [
            { label: "Home", path: "/Home", icon: PiHouseLineFill },
            { label: "My Profile", path: `/Account/Profile`, icon: FaRegCircleUser },
            { label: "Sends", path: "/Posts/Sends", icon: AiOutlineDashboard },
            { label: "Gear", path: "/Posts/Gear", icon: AiOutlineDashboard },
            { label: "Fit/Tech", path: "/Posts/FT", icon: AiOutlineDashboard },
            { label: "Find a Gym", path: "/Search", icon: HiMagnifyingGlass },
        ]
        : [
            { label: "Home", path: "/Home", icon: PiHouseLineFill },
            { label: "Sends", path: "/Posts/Sends", icon: AiOutlineDashboard },
            { label: "Gear", path: "/Posts/Gear", icon: AiOutlineDashboard },
            { label: "Fit/Tech", path: "/Posts/FT", icon: AiOutlineDashboard },
            { label: "Find a Gym", path: "/Search", icon: HiMagnifyingGlass },
            { label: "Signin", path: "/Account/Signin", icon: AiOutlineDashboard },
            { label: "Signup", path: "/Account/Signup", icon: AiOutlineDashboard },
        ];

    return (
        <div className="nav-bar">
            <ListGroup id="ct-navigation"
                className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block z-2" >
                <ListGroup.Item key="ct-logo" className="ct-logo-container">
                    <label className="ct-logo-text">ChalkTalk</label>
                    {currentUser && <><br /><br /> <label className="ct-logo-text">Welcome, {currentUser.firstName}</label></>}
                </ListGroup.Item>
                {
                    links.map((link) => (
                        <ListGroup.Item key={link.label} as={Link} to={link.path} className="nav-link-container">
                            <span className="nav-link-text"><link.icon /> {link.label} </span><br /><br />
                        </ListGroup.Item>
                    ))}
            </ListGroup>
        </div>
    );
}
