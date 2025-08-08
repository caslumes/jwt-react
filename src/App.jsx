import { useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import CustomButton from "./components/CustomButton";
import LoginForm from "./components/LoginForm";

function App() {
    const [users, setUsers] = useState([]);

    const apiUrl = "http://localhost:8080/api";
    const loginUrl = `${apiUrl}/login`;
    const usersUrl = `${apiUrl}/users`;
    const accessToken = useRef(null);

    const usernameInputRef = useRef();
    const passwordInputRef = useRef();

    const handleLogin = (e) => {
        e.preventDefault();

        const username = usernameInputRef.current.value;
        const password = passwordInputRef.current.value;

        login(username, password);
    };

    const login = (username, password) => {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);

        axios
            .post(loginUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((res) => {
                accessToken.current = res.data.access_token;
                console.log("Login successful");
            })
            .catch((err) => {
                if (err.response === undefined) {
                    console.error(err);
                    return;
                }
                console.error("Error when logging in: ", err.response.data);
                return;
            });
    };

    const handleGetUsersButtonClick = () => {
        fetchUsers();
    };

    const fetchUsers = async () => {
        axios
            .get(usersUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken.current}`,
                },
            })
            .then((res) => setUsers(res.data))
            .catch((err) => console.log(err.response.data));
    };

    return (
        <>
            <div className="flex flex-col items-center gap-5">
                <LoginForm
                    handleLogin={handleLogin}
                    usernameInputRef={usernameInputRef}
                    passwordInputRef={passwordInputRef}
                />
                <CustomButton onClick={handleGetUsersButtonClick}>
                    MOSTRAR USUARIOS
                </CustomButton>
                {users.map((user) => (
                    <p key={user.id}>{user.name}</p>
                ))}
            </div>
        </>
    );
}

export default App;
