import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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

    async function deleteUser(id) {
        await fetch(`http://localhost:3000/user/${id}`, {
            "method": "DELETE"
        });
        navigate("/");
    }

    return (
        <div className="top-lvl-formatting">
            <aside>
                <Link 
                    to={`/user/${params.id}/update`}
                    className="user">
                    Edit
                </Link>
                <button
                    type="button"
                    className="user"
                    onClick={
                        () => {deleteUser(params.id)}
                    }>
                    Delete
                </button>
            </aside>

            <main>
                <div className="bottom-lvl-formatting">
                    <span>{user.name}'s ({user.age}) dreams</span>
                    <Link 
                        to={`/dream/create?user=${params.id}`}
                        className="dream">
                        Create a new dream
                    </Link>
                </div>
                <section>
                    <ul>{dreamList}</ul>
                </section>
            </main>
        </div>
    );
}