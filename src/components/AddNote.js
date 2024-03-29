import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext'

export default function AddNote() {

    const context = useContext(noteContext);
    const { addNote,setnotes } = context;


    const addButton = (e) => {
        e.preventDefault();
        addNote(newNote.title, newNote.description, newNote.tag);
        setnewNote({title: "", description: "", tag: ""});
    }
    const onchange = (e) => {
        setnewNote({ ...newNote, [e.target.id]: e.target.value })
    }

    const [newNote, setnewNote] = useState({ title: "", description: "", tag: "" });

    return <div>
        <div className="container">
            <h2>Add a note</h2>
            <form>
                <div className="form-group my-3">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" value={newNote.title}  placeholder="Enter title" onChange={onchange} />

                </div>
                <div className="form-group">
                    <label htmlFor="Description">Description</label>
                    <input type="text" className="form-control" id="description" value={newNote.description} placeholder="Enter Description" onChange={onchange} />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="Tag">Tag</label>
                    <input type="text" className="form-control" id="tag" value={newNote.tag} placeholder="Enter tag" onChange={onchange} />
                </div>

                <button disabled={newNote.title.length < 5 || newNote.description.length < 5}  type="submit" className="btn btn-primary my-2" onClick={addButton}>Add Note</button>
            </form>


        </div>
    </div>;
}
