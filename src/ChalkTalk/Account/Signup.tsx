import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useState } from "react";
import * as accountClient from "./client"
import { v4 as uuidv4 } from "uuid";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import { Button } from 'react-bootstrap';

export default function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signup = async () => {
        const user = { ...defaultUser, _id: uuidv4(), username, password, firstName, lastName };
        const newUser = await accountClient.createUser(user);
        dispatch(setCurrentUser(newUser));
        navigate("/Account/Profile");
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const defaultUser = {
        _id: "",
        username: "",
        password: "",
        firstName: "",
        email: "",
        phoneNumber: "",
        lastName: "",
        dob: new Date("2000-01-01"),
        role: "USER",
        homeGym: ""
    }

    return (

        <div id="ct-signup-screen">
            <h1>Sign up</h1>
            <Form.Control defaultValue={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} className="ct-username d-block mb-2" /><br />
            <Form.Control defaultValue={password} placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} className="wd-password mb-2 d-block" /><br />
            <Form.Control defaultValue={firstName} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} className="ct-first-name d-block mb-2" /><br />
            <Form.Control defaultValue={lastName} placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} className="ct-last-name d-block mb-2" /><br />
            <Button onClick={signup} className="btn btn-primary w-100 mb-2">Sign up</Button>
            <Link to="/Account/Signin">Sign in</Link>
        </div>

    );
}
