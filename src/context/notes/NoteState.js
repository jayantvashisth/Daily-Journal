import NoteContext from "./noteContext";
import { useState} from "react";




const NoteState = (props) => {

    const initialNote =[];
    const [notes, setnotes] = useState(initialNote);

     
    //Get all notes
     const getNote =async () => {

        const url = "http://localhost:5000/api/notes/fetchallnotes"

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
            
        });
        const json = await response.json();
    //    console.log(json)
        setnotes(json)
    
    }



    //Add note

    const addNote =async (title, description, tag) => {

        const url = "http://localhost:5000/api/notes/addnote"

        const response = await fetch(url, {
            method: 'post',
            headers: {

                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },
            body: JSON.stringify({title,description,tag})
        });

        const note = await response.json();
       
        // console.log("adding a new note");
         setnotes(notes.concat(note))
    }


    //Edit Note
    const editNote = async (id, title, description, tag) => {

        // api call

        const url = `http://localhost:5000/api/notes/updatenote/${id}`

        const response = await fetch(url, {
            method: 'put',
            headers: {

                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            },
            body: JSON.stringify({title,description,tag})
        });
        const json = response.json();

        let newNotes = JSON.parse(JSON.stringify(notes))

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id){

                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }


        }
        setnotes(newNotes);
    }


    //Delete Note
    const deleteNote = async (id) => {

        const url = `http://localhost:5000/api/notes/deletenote/${id}`

        const response = await fetch(url, {
            method: 'DELETE',
            headers: {

                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')

            }
        });
        const json = response.json();
        console.log(json);

        const newNote = notes.filter((notes) => {
            return notes._id !== id
        })

        console.log("deleting note with id " + id);
        setnotes(newNote);
    }



    return (
        <NoteContext.Provider value={{ notes, setnotes, addNote, deleteNote ,getNote,editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}









export default NoteState;