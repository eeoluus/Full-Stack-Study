import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function DreamDetail() {

    const [dream, setDream] = useState({
        summary: undefined,
        quality: undefined,
        dreamer: undefined
    })
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getDream() {
            const id = params.id?.toString() || undefined;

            if (!id) return;
            const response = await fetch(
                `http://localhost:3000/dream/${id}`
            );

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                console.error(message);
                return;
            }

            const res = await response.json();
            if (!res) {
                console.warn(`Record with id ${id} not found`);
                navigate("/");
                return;
            }
            setDream({
                summary: res.dream.summary,
                quality: res.dream.quality,
                dreamer: res.dream.dreamer
            })
        }
        getDream();
        return;
    }, [params.id, navigate]);

    async function deleteDream(id) {
        await fetch(`http://localhost:3000/dream/${id}`, {
            "method": "DELETE"
        });
        navigate(`/user/${dream.dreamer._id}`);
    }

    return (
        <div className="top-lvl-formatting">
            <aside>
                <Link 
                    to={`/dream/${params.id}/update`}
                    className="dream">
                    Edit
                </Link>
                <button
                    type="button"
                    className="dream"
                    onClick={
                        () => {deleteDream(params.id)}
                    }>
                    Delete
                </button>
            </aside>

            <main>
                Here is your {dream.quality}: {dream.summary} 
            </main>
        </div>
    );
}