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
          note => note.folderId === this.context.folderId
        )
      : this.context.notes;

    const notes = noteList.map((note, i) => {
      return (
        <Note name={note.name} modified={note.modified} id={note.id} key={i} />
      );
    });

    return (
      <div className="notes-container">
        {notes}
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
