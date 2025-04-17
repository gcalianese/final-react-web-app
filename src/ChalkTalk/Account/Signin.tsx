import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as accountClient from "./client.ts"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer.ts";

export default function Signin() {
    const [credentials, setCredentials] = useState<any>({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signin = async () => {
        const user = await accountClient.signin(credentials)
        console.log("given user: " + JSON.stringify(user))
        if (!user) return;
        dispatch(setCurrentUser(user));
        navigate("/Home");
    };

    return (
        <div id="ct-signin-screen">
            <h1>Sign in</h1>
            <Form.Control id="ct-username"
                placeholder="username"
                defaultValue={credentials.username}
                className="mb-2"
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
            <Form.Control id="ct-password"
                placeholder="password" type="password"
                defaultValue={credentials.password}
                className="mb-2"
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
            <Button onClick={signin} id="ct-signin-btn" className="w-100" > Sign in </Button>
            <Link id="ct-signup-link" to="/Account/Signup">Sign up</Link>
        </div>);
}
