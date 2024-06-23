import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UserForm() {

    const [form, setForm] = useState({
        name: "",
        age: ""
    });
    const [isNew, setIsNew] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function getUser() {
            const id = params.id?.toString() || undefined;
            if (!id) return;

            setIsNew(false);

            const response = await fetch(
                `https://nighthawk-server1-bwxr7liqjq-lz.a.run.app/user/${id}`
                /* `http://localhost:3000/user/${id}` */
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

    async function onSubmit(e) {
        e.preventDefault();
        const user = { ...form };
        try {
            let response;
            if (isNew) {
                response = await fetch("https://nighthawk-server1-bwxr7liqjq-lz.a.run.app/user" /* "http://localhost:3000/user" */, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(user)
                });
                navigate("/");
            } else {
                response = await fetch(`https://nighthawk-server1-bwxr7liqjq-lz.a.run.app/user/${params.id}` /* `http://localhost:3000/user/${params.id}` */, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
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
        <form className="form-formatting" onSubmit={onSubmit}>
            <label htmlFor="name">
                Name:
            </label>
            <input 
                type="text"
                name="name"
                id="name"
                placeholder="JaneDoe"
                value={form.name}
                onChange={
                    (e) => updateForm({ name: e.target.value })
                } />
            <label htmlFor="age">
                Age:
            </label>
            <input 
                type="text"
                name="age"
                id="age"
                placeholder="1"
                value={form.age}
                onChange={
                    (e) => updateForm({ age: e.target.value })
                } />
            <button type="submit" className="user">
                Save
            </button>
        </form>
    );
}