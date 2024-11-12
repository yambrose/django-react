import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

export default function Form({ route, method }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate('/');
            } else {
                navigate('/login');
            }
        }
        catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return <form onSubmit={handleSubmit} className="flex flex-col w-1/2 bg-slate-300 gap-2 m-4 p-2 rounded-lg shadow-md
                bg-gradient-to-b from-gray-100 via-gray-200 to-gray-100"
    >
        <h1 className="text-3xl font-semibold">{name}</h1>
        <input
            className="rounded-sm p-2 font-thin text-lg"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />
        <input
            className="rounded-sm p-2 font-thin text-lg"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        <button className="rounded-sm bg-slate-200 w-2/5 p-2 font-thin text-lg hover:bg-slate-300"
            type="submit">{name}
        </button>
    </form>
}