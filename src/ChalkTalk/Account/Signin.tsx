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
        if (!user) return;
        dispatch(setCurrentUser(user));
        navigate("/Home");
    };

    return (
        <div id="ct-signin-screen">
            <h1 className="ct-sign-header"><b>Sign in</b></h1>
            <br />
            <Form.Control id="ct-username"
                placeholder="username"
                defaultValue={credentials.username}
                className="mb-2"
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
            <br />
            <Form.Control id="ct-password"
                placeholder="password" type="password"
                defaultValue={credentials.password}
                className="mb-2"
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
            <br />
            <Button onClick={signin} id="ct-signin-btn" className="ct-btn w-100" > Sign in </Button>
            <br />
            <Link className="ct-text-dark-purple" id="ct-signup-link" to="/Account/Signup">Sign up</Link>
        </div>);
}
