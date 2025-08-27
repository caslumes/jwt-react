import { Trash } from "lucide-react";

function UsersTable({ users, currentUser, handleDeleteUser }) {
    return (
        <table className="w-[50%] table-fixed border-1">
            <thead>
                <tr>
                    <th className="py-2">ID</th>
                    <th>Nome</th>
                    <th>Nome de usuário</th>
                    {currentUser.roles[0].name === "ROLE_USER" ? null : (
                        <th></th>
                    )}
                </tr>
            </thead>
            <tbody className="text-center">
                {users.map((user) => (
                    <tr key={user.id}>
                        <td className="py-2">{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        {currentUser.roles[0].name === "ROLE_USER" ||
                        user.id === currentUser.id ? null : (
                            <td>
                                <button
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="cursor-pointer hover:bg-black/25 p-1 rounded-full"
                                >
                                    <Trash />
                                </button>
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default UsersTable;
