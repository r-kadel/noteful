import React from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import './NoteDetail.css';
import NoteContext from '../NoteContext'

class NoteDetail extends React.Component {
    static contextType = NoteContext;
    render() {
        const note = this.context.notes.find(note => note.id === parseInt(this.props.match.params.noteId))
        const folder = this.context.folders.find(folder => folder.id === note.folder_id)
        return (
            <div className="note-detail-container">
                <div className="left-sidebar">
                    <Link to="/">
                        <button 
                            type="button" 
                            className="go-back-button" 
                            onClick={this.props.goBack}
                        >
                            Go Back
                        </button>
                    </Link>
                    <h2>{folder.name}</h2>
                </div>
                <div className="note-details">
                    <Note 
                        id={this.props.match.params.noteId} 
                        name={note.title} 
                        modified={note.date_created} 
                    />
                    <p className="note-content">{note.content}</p>
                </div>
            </div>
        )
         
    }
}

export default NoteDetail;