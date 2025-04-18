import { AiOutlineDashboard } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { PiHouseLineFill } from "react-icons/pi";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaUsers } from "react-icons/fa6";
import { GiMountainClimbing } from "react-icons/gi";
import { IoIosFitness } from "react-icons/io";
import { GiRopeDart } from "react-icons/gi";
import { GiMountaintop } from "react-icons/gi";


export default function NavBar() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    // Users still have access even when not logged in, only ADMIN has access to "Users" page
    const links = currentUser
        ? currentUser.role === "ADMIN"
            ? [
                { label: "Home", path: "/Home", icon: PiHouseLineFill },
                { label: "My Profile", path: `/Account/Profile`, icon: FaRegCircleUser },
                { label: "Users", path: "/Users", icon: FaUsers },
                { label: "Sends", path: "/Posts/Sends", icon: GiMountainClimbing },
                { label: "Gear", path: "/Posts/Gear", icon: GiRopeDart },
                { label: "Fit/Tech", path: "/Posts/FT", icon: IoIosFitness },
                { label: "Find a Gym", path: "/Search", icon: HiMagnifyingGlass },
            ]
            : [
                { label: "Home", path: "/Home", icon: PiHouseLineFill },
                { label: "My Profile", path: `/Account/Profile`, icon: FaRegCircleUser },
                { label: "Sends", path: "/Posts/Sends", icon: GiMountainClimbing },
                { label: "Gear", path: "/Posts/Gear", icon: GiRopeDart },
                { label: "Fit/Tech", path: "/Posts/FT", icon: IoIosFitness },
                { label: "Find a Gym", path: "/Search", icon: HiMagnifyingGlass },
            ]
        : [
            { label: "Home", path: "/Home", icon: PiHouseLineFill },
            { label: "Sends", path: "/Posts/Sends", icon: GiMountainClimbing },
            { label: "Gear", path: "/Posts/Gear", icon: GiRopeDart },
            { label: "Fit/Tech", path: "/Posts/FT", icon: IoIosFitness },
            { label: "Find a Gym", path: "/Search", icon: HiMagnifyingGlass },
            { label: "Signin", path: "/Account/Signin", icon: AiOutlineDashboard },
            { label: "Signup", path: "/Account/Signup", icon: AiOutlineDashboard },
        ];

    return (
        <div className="nav-bar">
            <ListGroup id="ct-navigation"
                className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block z-2" >
                <div className="ct-logo-container">
                    <label className="ct-logo-text">ChalkTalk</label><br /><br />
                    <span className="ct-logo"><GiMountaintop /></span>
                    {currentUser && <><br /> <label className="ct-logo-text">Welcome, {currentUser.firstName}</label></>}<br /><br />
                </div>
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
