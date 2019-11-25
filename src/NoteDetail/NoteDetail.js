import React from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import './NoteDetail.css';
import NoteContext from '../NoteContext'

class NoteDetail extends React.Component {
    static contextType = NoteContext;
    render() {
        const note = this.context.notes.find(note => note.id === this.props.noteId);
        const folder = this.context.folders.find(folder => folder.id === note.folderId);
        if(note && folder){
        return (
            <div className="note-detail-container">
                <div className="left-sidebar">
                    <Link to="/">
                        <button type="button" className="go-back-button" onClick={this.props.goBack}>Go Back</button>
                    </Link>
                    <h2>{folder.name}</h2>
                </div>
                <div className="note-details">
                    <Note id={this.props.noteId} name={note.name} modified={note.modified} />
                    <p className="note-content">{note.content}</p>
                </div>
            </div>
        )
        } else {
            return window.location.replace('http://localhost:3000')
        }
    }
}

export default NoteDetail;