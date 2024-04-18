import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Dream from "./Dream.jsx";

export default function UserDetail() {

    const [user, setUser] = useState({
        name: undefined,
        age: undefined
    })
    const [dreams, setDreams] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getUser() {
            const id = params.id?.toString() || undefined;

            if (!id) return;
            const response = await fetch(
                `http://localhost:3000/user/${id}`
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

            setUser({
                name: res.user.name,
                age: res.user.age
            });
            setDreams(res.userDreams)
        }
        getUser();
        return;
    }, [params.id, navigate]);

    const dreamList = dreams.map(
        (dream) => (
            <Dream 
                id={dream._id}
                summary={dream.summary}
                quality={dream.quality}
                key={dream._id}
            />
        )
    )

    return (
        <>
            <div><b>{user.name}'s dreams, age: {user.age}</b></div>
            <ul>
                {dreamList}
            </ul>
        </>
    );
}