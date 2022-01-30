import React, { useContext , useState } from 'react';
import noteContext from '../context/notes/noteContext'

export default function NoteItem(props) {
    
    const context = useContext(noteContext);
    const { deleteNote } = context;

    const { note, updateNote } = props;

    return (
        <div className='col-md-3 d-inline my-2'>
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">{note.title} <button type="button" className="btn btn-outline-info btn-sm">{note.tag}</button></h5>
                    <p className="card-text">{note.description}</p>
                    <div className="temp">
                    <p className="card-text d-inline">{note.date.substring(0, 10)}</p>
                    <div className="temp2">
                    <i className="fa fa-trash" aria-hidden="true" onClick={()=>deleteNote(note._id)}></i>
                    <i className="fa fa-pencil" aria-hidden="true" onClick={()=>{
                        updateNote(note)
                        console.log("click click" )
                        }}></i>

                    </div>

                    </div>



                </div>
            </div>
        </div>);
}
