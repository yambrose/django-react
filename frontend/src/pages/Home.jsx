import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Note from "../components/Note";

export default function Home() {

    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api.get('api/notes/')
            .then((res) => res.data)
            .then((data) => { setNotes(data); console.log(data) })
            .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api
            .delete(`api/notes/delete/${id}/`)
            .then((res) => {
                res.status === 204 ? alert('Note deleted') : alert('Error deleting this note');
                getNotes();
            })
            .catch((err) => alert(err));
    };

    const createNote = (e) => {
        e.preventDefault();
        api.post('api/notes/', { content, title })
            .then((res) => {
                res.status === 201 ? alert('Note created') : alert('Error creating this note');
                getNotes();
            })
            .catch((err) => alert(err));
    }

    const clearForm = () => {
        setContent('');
        setTitle('');
    }

    const navigate = useNavigate();

    return (
        <div>

            <form className="bg-slate-200 rounded-md flex flex-col m-2 p-2 shadow-md gap-4" onSubmit={createNote}>
                <h2 className="font-bold text-2xl uppercase">Write a Note</h2>
                <label className="font-bold uppercase text-lg" htmlFor="title">Title</label>
                <input
                    className="p-2 rounded-sm"
                    type='text'
                    id='title'
                    name='title'
                    placeholder="Title"
                    required onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label className="font-bold uppercase text-lg" htmlFor="content">Content</label>
                <textarea
                    className="h-32 p-2 rounded-sm"
                    id='content'
                    name='content'
                    placeholder="Content"
                    required
                    onChange={(e) => setContent(e.target.value)}
                    value={content}
                />
                <button className="bg-slate-500 text-white p-2 rounded-md hover:bg-slate-400 w-20" type='submit'>Submit</button>
            </form>
            <div className="bg-slate-200 rounded-md flex flex-col m-2 p-2 shadow-md gap-4">
                <h2 className="font-bold text-2xl uppercase">My Notes</h2>
                {notes.map((note) => <Note key={note.id} note={note} onDelete={deleteNote} />)}
            </div>
        </div>
    );
}
