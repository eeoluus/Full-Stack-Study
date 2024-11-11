import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DreamDetailLayout from "./DreamDetailLayout.jsx";

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
                `https://nighthawk-server1-bwxr7liqjq-lz.a.run.app/dream/${id}`
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
        await fetch(
            `https://nighthawk-server1-bwxr7liqjq-lz.a.run.app/dream/${id}`, 
            { "method": "DELETE" }
        );
        navigate(`/user/${dream.dreamer._id}`);
    }

    return (
        <DreamDetailLayout 
            dream={dream}
            params={params}
            deleteDream={deleteDream}/>
    );
}