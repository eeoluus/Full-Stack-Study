import { useEffect, useState } from "react";
import User from "./User.jsx"
import { Link } from "react-router-dom";
import CustomDropdown from "./CustomDropdown.jsx";

export default function UserList() {
    const [users, setUsers] = useState([]);

    /**
     * Fetch users from the server.
     */
    useEffect(() => {
        async function getUsers() {
            const response = await fetch(
                "https://nighthawk-server1-bwxr7liqjq-lz.a.run.app/users/" 
                /* "http://localhost:3000/users/" */
            );
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                console.error(message);
                return;
            }
            const users = await response.json();
            setUsers(users);
        }
        getUsers();
        return;
    }, [users.length]);

    const userList = users.map(
        (user) => (
            <li>
                <User 
                    id={user._id}
                    name={user.name}
                    age={user.age}
                    key={user._id}
                />
            </li>
        )
    )

    return (
        <>
            <h2>Users</h2>
            <ul className="user-list">
                {userList}
            </ul>
        </>
        
    );
}