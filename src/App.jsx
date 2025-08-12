import { useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import CustomButton from "./components/CustomButton";
import LoginForm from "./components/LoginForm";
import { Trash } from "lucide-react";
import UsersTable from "./components/UsersTable";

function App() {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

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
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${accessToken.current}`;

                console.log(res.data.user);

                setCurrentUser(res.data.user);

                usernameInputRef.current.value = "";
                passwordInputRef.current.value = "";

                console.log("Login successful");
            })
            .catch((err) => {
                if (err.response === undefined) {
                    console.error(err);
                    return;
                }
                console.error("Error when logging in: ", err.response.data);
            });
    };

    const handleGetUsersButtonClick = () => {
        fetchUsers();
    };

    const fetchUsers = async () => {
        axios
            .get(usersUrl)
            .then((res) => setUsers(res.data))
            .catch((err) => console.log(err.response.data));
    };

    const handleDeleteUser = (userId) => {
        deleteUser(userId);
    };

    const deleteUser = async (userId) => {
        console.log(`Deleting user with id ${userId}.`);
        axios
            .delete(`${usersUrl}/${userId}`)
            .then(() => fetchUsers())
            .catch((err) => {
                if (err.response === undefined) {
                    console.error(err);
                    return;
                }
                if (err.response.status === 403) {
                    console.error("Você não tem permissão para isso!");
                }
            });
    };

    return (
        <>
            <div className="flex flex-col items-center gap-5 pt-5">
                {currentUser !== null ? (
                    <>
                        <p>Voce é o {currentUser.name}</p>
                    </>
                ) : (
                    <LoginForm
                        handleLogin={handleLogin}
                        usernameInputRef={usernameInputRef}
                        passwordInputRef={passwordInputRef}
                    />
                )}

                <CustomButton onClick={handleGetUsersButtonClick}>
                    MOSTRAR USUARIOS
                </CustomButton>
                <UsersTable
                    users={users}
                    currentUser={currentUser}
                    handleDeleteUser={handleDeleteUser}
                />
            </div>
        </>
    );
}

export default App;
