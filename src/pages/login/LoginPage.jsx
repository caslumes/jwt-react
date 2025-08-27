import { useEffect, useRef } from "react";
import { useAuth } from "../../core/auth/useAuth";
import { useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";

function LoginPage() {
    const { login, userData } = useAuth();
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
            navigate("/users/manage");
        }
    });

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="w-[40%] bg-blue-500 py-10 px-5 rounded-lg flex flex-col items-center gap-5">
                <h1 className="text-3xl font-bold mx-auto">ENTRAR</h1>
                <LoginForm
                    handleLogin={handleLogin}
                    usernameInputRef={usernameInputRef}
                    passwordInputRef={passwordInputRef}
                />
            </div>
        </div>
    );
}

export default LoginPage;
