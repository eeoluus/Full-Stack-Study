import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DreamDetail() {

    const [summary, setSummary] = useState("");
    const [quality, setQuality] = useState("");
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
            console.log(res);
            if (!res) {
                console.warn(`Record with id ${id} not found`);
                navigate("/");
                return;
            }
            setSummary(res.summary);
            setQuality(res.quality);
        }
        getDream();
        return;
    }, [params.id, navigate]);


    return (
        <> {/* Should preferably only include a shortened summary. */}
            Here is your {quality}: {summary} 
        </>
    );
}