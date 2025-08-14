import { useEffect, useRef } from "react";
import { useAuth } from "../components/AuthProvider";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const auth = useAuth();
    const navigate = useNavigate();

    const usernameInputRef = useRef();
    const passwordInputRef = useRef();

    const handleLogin = (e) => {
        e.preventDefault();

        const username = usernameInputRef.current.value;
        const password = passwordInputRef.current.value;

        auth.login(username, password);
    };

    useEffect(() => {
        if (auth.userData !== null && auth.userData !== undefined) {
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
