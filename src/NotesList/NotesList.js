import React from "react";
import Note from "../Note/Note";
import "./NotesList.css";
import NoteContext from "../NoteContext";
import { Link } from 'react-router-dom'

class NotesList extends React.Component {
  static contextType = NoteContext;

  render() {
    const noteList = this.context.folderId
      ? this.context.notes.filter(
          note => note.folder_id === this.context.folderId
        )
      : []

    const notes = () => {
      if(noteList.length > 0) {
        return noteList.map(note => {
            return (
              <Note name={note.name} title={note.title} modified={note.date_created} id={note.id} key={note.id} />
            )
        })
      } else {
        return (
          <h1>No notes!</h1>
        )
      }
    }

    return (
      <div className="notes-container">
        {notes()}
        <Link to='/addNote'>
        <button className="add-note-button" type="button">
          Add a note
        </button>
        </Link>
      </div>
    );
  }
}

export default NotesList;
