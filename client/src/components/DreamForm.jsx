import { useState, useEffect, useRef, useLayoutEffect } from "react";
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

    const textareaRef = useRef(null);

    const [preselectedQuality, setPreselectedQuality] = useState(""); 
    const [summaryValidationActive, setSummaryValidationActive] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const [isNew, setIsNew] = useState(true);
    const params = useParams();
    const navigate = useNavigate();
    
    const apiUri = process.env.NODE_ENV === "development"
        ? "http://localhost:3000/dream"
        : "https://nighthawk-server1-bwxr7liqjq-lz.a.run.app/dream";

    useLayoutEffect(resizeTextarea, [form.summary]);

    useEffect(() => {
        async function getDream() {
            const id = params.id?.toString();
            if (!id) return;
            setIsNew(false);
            const response = await fetch(`${apiUri}/${id}`);
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

    function resizeTextarea() {
        /* The upper value should be the same as in the relevant .css files. */
        textareaRef.current.style.height = "2em";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    };

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    };

    async function handleSubmit(event) {
        event.preventDefault();
        if (!form.summary || !form.quality) {
            setSummaryValidationActive(true);
            return;
        }
        const dream = { ...form };
        console.log(dream);
        try {
            let response;
            if (isNew) {
                response = await fetch(`${apiUri}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(dream)
                });
                navigate(`/user/${form.dreamer}`);
            } else {
                response = await fetch(`${apiUri}/${params.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
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
        }
    }    

    function handleChange(event) {
        setSummaryValidationActive(true);
        updateForm({ summary: event.target.value });
    }

    return (
        <form 
            noValidate
            onSubmit={handleSubmit}>
            <label htmlFor="summary">
                Summary: 
            </label>
            <div>
                <textarea 
                    name="summary"
                    id="summary"
                    ref={textareaRef}
                    className={
                        summaryValidationActive && !form.summary 
                            ? "with-error" 
                            : ""
                    }
                    placeholder="Once upon a time..."
                    required
                    value={form.summary}
                    onChange={handleChange}
                    >
                </textarea>
                {/* Error message */}
                {summaryValidationActive && !form.summary && 
                <div 
                    className="error" 
                    aria-live="polite">
                    This field cannot be empty.
                </div>}
            </div>
            <label htmlFor="dreamType">
                Quality:
            </label>
            <CustomDropdown 
                dreamTypes={DREAM_TYPES} 
                updateForm={updateForm}
                preselectedQuality={preselectedQuality}/>
            <button 
                type="submit" 
                className="dream">
                Save
            </button>
        </form>
    );
}