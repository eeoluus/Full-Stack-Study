import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import UserDetailLayout from "./UserDetailLayout.jsx";

export default function UserDetail() {
    const [user, setUser] = useState({
        name: undefined,
        age: undefined,
        dreams: []
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getUser() {
            const id = params.id?.toString() || undefined;
            if (!id) return;
            const response = await fetch(
                `https://nighthawk-server1-bwxr7liqjq-lz.a.run.app/user/${id}`
            );
            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                console.error(message);
                return;
            }
            const res = await response.json();
            if (!res.user) {
                console.warn(`Record with id ${id} not found`);
                navigate("/");
                return;
            }
            console.log(res);
            setUser({
                name: res.user.name,
                age: res.user.age,
                dreams: res.userDreams
            });
        }
        getUser();
        return;
    }, [params.id, navigate]);

    async function deleteUser(id) {
        await fetch(
            `https://nighthawk-server1-bwxr7liqjq-lz.a.run.app/user/${id}`, 
            { "method": "DELETE" }
        );
        navigate("/");
    }

    return (
        <UserDetailLayout 
            user={user}
            params={params} 
            deleteUser={deleteUser}/>
    );
}