function UsersTable({ users, currentUser, handleDeleteUser }) {
    return (
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
                        {currentUser.roles[0].name === "ROLE_USER" ? null : (
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
