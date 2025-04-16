import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
export default function Signup() {
    const navigate = useNavigate();
    const signup = () => {
        navigate("/Rocks/Account/MyAccount");
    };
    return (

        <div id="rocks-signup-screen">
            <h1>Sign up</h1>
            <Form.Control placeholder="username" className="rocks-username d-block mb-2" />
            <Form.Control placeholder="password" type="password" className="wd-password mb-2 d-block" />
            <Link to="/Rocks/Account/MyAccount" onClick={signup} className="btn btn-primary w-100 mb-2"> Sign up </Link>
            <Link to="/Rocks/Account/Signin">Sign in</Link>
        </div>

    );
}
