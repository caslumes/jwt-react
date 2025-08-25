import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import CustomButton from "./components/CustomButton";
import UsersTable from "./components/UsersTable";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./core/auth/useAuth";
import { ENDPOINTS } from "./core/api/api";

function App() {
    const navigate = useNavigate();
    const auth = useAuth();

    const [users, setUsers] = useState([]);

    const usersUrl = ENDPOINTS.USERS;

    useEffect(() => {
        if (auth.userData === null) {
            navigate("/login");
        }
    });

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

    const handleLogout = () => {
        auth.logout();
    };

    return (
        <>
            <button onClick={handleLogout}>SAIR</button>
            {auth.userData !== null ? (
                <div className="flex flex-col items-center gap-5 pt-5">
                    <p>Voce é o {auth.userData.name}</p>
                    <CustomButton onClick={handleGetUsersButtonClick}>
                        MOSTRAR USUARIOS
                    </CustomButton>
                    <UsersTable
                        users={users}
                        currentUser={auth.userData}
                        handleDeleteUser={handleDeleteUser}
                    />
                </div>
            ) : null}
        </>
    );
}

export default App;
