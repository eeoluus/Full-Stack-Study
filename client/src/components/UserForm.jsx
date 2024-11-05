import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UserForm() {

    const [form, setForm] = useState({
        name: "",
        age: ""
    });
    const [isNew, setIsNew] = useState(true);

    const [nameValidationActive, setNameValidationActive] = useState(false);
    const [ageValidationActive, setAgeValidationActive] = useState(false);
    const [agePatternMismatch, setAgePatternMismatch] = useState(false);

    const params = useParams();
    const navigate = useNavigate();

    const apiUri = process.env.NODE_ENV === "development"
        ? "http://localhost:3000/user"
        : "https://nighthawk-server1-bwxr7liqjq-lz.a.run.app/user";

    useEffect(() => {
        async function getUser() {
            const id = params.id?.toString() || undefined;
            if (!id) return;
            setIsNew(false);
            const response = await fetch(`${apiUri}/${id}`);
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
            setForm({
                name: res.user.name,
                age: res.user.age
            });
        }
        getUser();
        return;
    }, [params.id, navigate]);

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    function handleNameChange(event) {
        setNameValidationActive(true);
        updateForm({ name: event.target.value });
    }

    function handleAgeChange(event) {
        setAgeValidationActive(true);
        updateForm({ age: event.target.value });
        setAgePatternMismatch(event.target.validity.patternMismatch);
    }

    async function onSubmit(event) {
        event.preventDefault();
        if (!form.name || !form.age || agePatternMismatch) {
            setNameValidationActive(true);
            setAgeValidationActive(true);
            return;
        }
        const user = { ...form };
        try {
            let response;
            if (isNew) {
                response = await fetch(apiUri, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user)
                });
                navigate("/");
            } else {
                response = await fetch(`${apiUri}/${params.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user)
                });
                navigate(`/user/${params.id}`);
            }
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        } catch (error) {
            console.error("A problem occurred adding or updating a user: ", error);
        } finally {
            setForm({ name: "", age: "" });
        }
    }

    return (
        <form 
            noValidate 
            onSubmit={onSubmit}>
            <label htmlFor="name">
                Name:
            </label>
            <div>
                <input 
                    type="text"
                    name="name"
                    id="name"
                    className={
                        nameValidationActive && !form.name 
                            ? "with-error" 
                            : ""
                    }
                    placeholder="JaneDoe"
                    required
                    value={form.name}
                    onChange={handleNameChange} />
                {nameValidationActive && !form.name && <div 
                    className="error" 
                    aria-live="polite">
                    This field cannot be empty.
                </div>}
            </div>
            <label htmlFor="age">
                Age:
            </label>
            <div>
                <input 
                    type="text"
                    name="age"
                    id="age"
                    className={
                        ageValidationActive && (!form.age || agePatternMismatch) 
                            ? "with-error" 
                            : ""
                    }
                    placeholder="1"
                    required
                    pattern="\b([1-9]|[1-9][0-9])\b"
                    value={form.age}
                    onChange={handleAgeChange} />
                {ageValidationActive && !form.age && 
                <div 
                    className="error" 
                    aria-live="polite">
                    This field cannot be empty.
                </div>}
                {ageValidationActive && agePatternMismatch && 
                <div 
                    className="error" 
                    aria-live="polite">
                    Enter a number between 1 and 99.
                </div>}
            </div>
            <button type="submit" className="user">
                Save
            </button>
        </form>
    );
}