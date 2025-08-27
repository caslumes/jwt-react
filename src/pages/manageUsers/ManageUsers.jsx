import { useNavigate } from "react-router-dom";
import { useAuth } from "../../core/auth/useAuth";
import { useEffect, useState } from "react";
import { ENDPOINTS } from "../../core/api/api";
import axios from "axios";
import CustomButton from "../../components/CustomButton";
import UsersTable from "../../components/UsersTable";

function ManageUsers() {
    const navigate = useNavigate();
    const {userData, logout} = useAuth();

    const [users, setUsers] = useState([]);

    const usersUrl = ENDPOINTS.USERS;

    useEffect(() => {
        if (userData === null) {
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
        logout();
    };

    return (
        <>
            {userData !== null ? (
                <div className="flex flex-col items-center gap-5">
                    <div className="w-full flex justify-between p-2">
                        <p className="font-bold">{userData.name}</p>
                        <CustomButton onClick={handleLogout}>SAIR</CustomButton>
                    </div>
                    <CustomButton onClick={handleGetUsersButtonClick}>
                        MOSTRAR USUARIOS
                    </CustomButton>
                    <UsersTable
                        users={users}
                        currentUser={userData}
                        handleDeleteUser={handleDeleteUser}
                    />
                </div>
            ) : null}
        </>
    );
}

export default ManageUsers;
