import React from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import './NoteDetail.css';

class NoteDetail extends React.Component {
    render() {
        const note = this.props.store.notes.find(note => note.id === this.props.noteId);
        const folder = this.props.store.folders.find(folder => folder.id === note.folderId);
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
    }
}

export default NoteDetail;