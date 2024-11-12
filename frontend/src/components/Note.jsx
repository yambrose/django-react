export default function Note({note, onDelete}) {

    const formattedDate = new Date(note.created_at).toLocaleDateString('en-CA');

    return (
        <div className="flex flex-col bg-slate-300 p-4 m-4 rounded-md">
            <h3 className="font-semibold text-xl">{note.title}</h3>
            <p className="bg-slate-100 p-2">{note.content}</p>
            <p className="hover:underline text-blue-600">{formattedDate}</p>
            <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-400 w-20" onClick={() => onDelete(note.id)}>Delete</button>
        </div>
    );
}