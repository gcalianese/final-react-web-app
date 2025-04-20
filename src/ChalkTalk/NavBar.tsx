import { Link, useLocation } from "react-router-dom";
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
    const { pathname } = useLocation();

    // Users still have access even when not logged in, only ADMIN has access to "Users" page
    const links = currentUser
        ? currentUser.role === "ADMIN"
            ? [
                { label: "Home", path: "/Home", icon: PiHouseLineFill },
                { label: "Users", path: "/Users", icon: FaUsers },
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
            ]
        : [
            { label: "Home", path: "/Home", icon: PiHouseLineFill },
            { label: "Sends", path: "/Posts/Sends", icon: GiMountainClimbing },
            { label: "Gear", path: "/Posts/Gear", icon: GiRopeDart },
            { label: "Fit/Tech", path: "/Posts/FT", icon: IoIosFitness },
            { label: "Find a Gym", path: "/Search", icon: HiMagnifyingGlass },
        ];

    const active = (pathname: string, link: string) => {
        if (link === "/Account/Profile") {
            return pathname === "/Account/Profile";
        }

        return pathname.includes(link);
    };

    return (
        <div className="d-none d-md-block">
            <ListGroup id="ct-navigation" className="nav-bar" >
                <div>
                    <Link to="/" rel="noopener noreferrer">
                        <div className="ct-logo-container mb-3">
                            <label className="mt-2">ChalkTalk</label><br />
                            <span className="ct-logo">
                                <GiMountaintop className="ct-logo" />
                            </span>
                        </div>
                    </Link>
                </div>
                <div>
                    {links.map((link) => (
                        <ListGroup.Item key={link.label} as={Link} to={link.path}
                            className={`border-0 ${active(pathname, link.path) ? "nav-link-container-selected" : "nav-link-container"}`}>
                            <span className={`${active(pathname, link.path) ? "nav-link-text-selected" : "nav-link-text"}`} >
                                <link.icon /> {link.label}
                            </span>
                        </ListGroup.Item>
                    ))}
                </div>
            </ListGroup>
        </div>
    );
}
