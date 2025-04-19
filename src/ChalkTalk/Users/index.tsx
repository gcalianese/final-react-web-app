import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as accountClient from "../Account/client";
import { useNavigate } from "react-router";
import { MdDeleteForever } from "react-icons/md";

export default function Users() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const navigate = useNavigate();

    type Role = "ADMIN" | "MOD" | "USER";

    type User = {
        _id: string;
        username: string;
        password: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        role: Role;
        homeGym?: string;
    };

    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = async () => {
        const users = await accountClient.getAllUsers();
        setUsers(users);
    };

    const handleDelete = async (uid: string) => {
        try {
            await accountClient.deleteUser(uid);
            fetchUsers();
        } catch (err) {
            console.error("Failed to delete user:", err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div id="ct-users">
            <div className="table-container">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th></th> {/* Delete icon header */}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td onClick={() => navigate(`/Account/Profile/${user._id}`)}>
                                    {user.username}
                                </td>
                                <td onClick={() => navigate(`/Account/Profile/${user._id}`)}>
                                    {user.firstName}
                                </td>
                                <td onClick={() => navigate(`/Account/Profile/${user._id}`)}>
                                    {user.lastName}
                                </td>
                                <td onClick={() => navigate(`/Account/Profile/${user._id}`)}>
                                    {user.email}
                                </td>
                                <td onClick={() => navigate(`/Account/Profile/${user._id}`)}>
                                    {user.role}
                                </td>
                                <td>
                                    <MdDeleteForever
                                        size={24}
                                        color="rgb(173, 0, 0)"
                                        style={{ cursor: "pointer" }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(user._id);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}