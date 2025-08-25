import { useEffect, useRef } from "react";
import { useAuth } from "../core/auth/useAuth";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const {login, userData} = useAuth();
    const navigate = useNavigate();

    const usernameInputRef = useRef();
    const passwordInputRef = useRef();

    const handleLogin = (e) => {
        e.preventDefault();

        const username = usernameInputRef.current.value;
        const password = passwordInputRef.current.value;

        login(username, password);
    };

    useEffect(() => {
        if (userData !== null && userData !== undefined) {
            navigate("/");
        }
    });

    return (
        <div className="flex flex-col items-center pt-5">
            <LoginForm
                handleLogin={handleLogin}
                usernameInputRef={usernameInputRef}
                passwordInputRef={passwordInputRef}
            />
        </div>
    );
}

export default LoginPage;
