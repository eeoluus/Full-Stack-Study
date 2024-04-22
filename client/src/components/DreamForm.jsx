import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DreamForm() {

    const [form, setForm] = useState("");
    const [isNew, setIsNew] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    // Tee loppuun! Eli pitäisi kaivaa vanhat tiedot, jos on.
}