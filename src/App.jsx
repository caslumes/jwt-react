import { useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import CustomButton from "./components/CustomButton";
import LoginForm from "./components/LoginForm";
import { Trash } from "lucide-react";

function App() {
    const [users, setUsers] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

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

                setIsLoggedIn(true);

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
                {isLoggedIn ? null : (
                    <LoginForm
                        handleLogin={handleLogin}
                        usernameInputRef={usernameInputRef}
                        passwordInputRef={passwordInputRef}
                    />
                )}

                <CustomButton onClick={handleGetUsersButtonClick}>
                    MOSTRAR USUARIOS
                </CustomButton>
                <table className="w-[50%]">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Nome de usuário</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            handleDeleteUser(user.id)
                                        }
                                        className="cursor-pointer hover:bg-black/25 p-1 rounded-full"
                                    >
                                        <Trash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default App;
