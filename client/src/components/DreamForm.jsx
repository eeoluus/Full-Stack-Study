import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import CustomDropdown from "./CustomDropdown";

const DREAM_TYPES = [
    { id: "option-0", name: "Ordinary" },
    { id: "option-1", name: "Nightmare" },
    { id: "option-2", name: "Dream come true" }
]

export default function DreamForm() {

    const [form, setForm] = useState({
        summary: "",
        quality: "",
        dreamer: ""
    });
    const [preselectedQuality, setPreselectedQuality] = useState(""); 

    const [isNew, setIsNew] = useState(true);
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    

    useEffect(() => {
        console.log("hi");
        async function getDream() {
            const id = params.id?.toString();
            if (!id) return;
    
            setIsNew(false);

            const response = await fetch(
                `https://nighthawk-server1-bwxr7liqjq-lz.a.run.app/dream/${id}`
            );

            if (!response.ok) {
                const message =  `An error occurred: ${response.statusText}`;
                console.error(message);
                return;
            }
            const res = await response.json();
            if (!res.dream) {
                console.warn(`Record with id ${id} not found`);
                navigate("/");
                return;
            }
            updateForm({
                summary: res.dream.summary,
                quality: res.dream.quality,
                dreamer: res.dream.dreamer
            });
            setPreselectedQuality(res.dream.quality);
        }
        getDream();
        if (isNew) updateForm({ dreamer: searchParams.get("user") });
        return;    
    }, [params.id, searchParams, navigate]);

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const dream = { ...form };
        console.log(dream);
        /* try {
            let response;
            if (isNew) {
                response = await fetch("https://nighthawk-server1-bwxr7liqjq-lz.a.run.app/dream/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dream)
                });
                navigate(`/user/${form.dreamer}`);
            } else {
                response = await fetch(`https://nighthawk-server1-bwxr7liqjq-lz.a.run.app/dream/${params.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(dream)
                });
                navigate(`/dream/${params.id}`);
            }
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error("A problem occurred adding or updating a dream: ", error);
        } finally {
            setForm({ summary: "", quality: "", dreamer: "" });
        } */
    }    

    return (
        <form className="form-formatting widget" onSubmit={handleSubmit}>
            <label htmlFor="summary">
                Summary: 
            </label>
            <textarea 
                name="summary"
                id="summary"
                placeholder="Once upon a time..."
                value={form.summary}
                onChange={
                    (event) => updateForm({ summary: event.target.value })
                }>
            </textarea>
            <label htmlFor="dreamType">
                Quality:
            </label>
{/*             <input 
                type="text"
                name="quality"
                id="quality"
                placeholder="Nightmare OR Ordinary"
                value={form.quality}
                onChange={
                    (e) => updateForm({ quality: e.target.value })
                } /> */}
            <CustomDropdown 
                dreamTypes={DREAM_TYPES} 
                updateForm={updateForm}
                preselectedQuality={preselectedQuality}/>
            <button type="submit" className="dream">
                Save
            </button>
        </form>
    );
}