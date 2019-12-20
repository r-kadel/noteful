import React, { Component } from "react";
import "./AddNote.css";
import NoteContext from "../NoteContext";

class AddNote extends Component {
  static contextType = NoteContext;

  handleSubmit = e => {
    e.preventDefault();
    
    const name = e.target.noteName.value
		const content = e.target.noteContent.value
		const folderId = e.target.folderId.value
		const modified = new Date()

		this.context.addNote({ name, content, folderId, modified })

    this.props.history.goBack();
  };

  folderOptions = () => this.context.folders.map(folder => {
    return (
        <option value={folder.id} key={folder.id}>
            {folder.name}
        </option>
    )
  })

  render() {
    return (
      <div className="note-form-container">
        <button
          className="back-button"
          onClick={() => this.props.history.goBack()}
        >
          Go Back
        </button>
        <form className="add-note" onSubmit={e => this.handleSubmit(e)}>
          <h2>Make a Note</h2>
          <div className="form-group">
            <label htmlFor="noteName"> New Note Name: </label>
            <br />
            <input type="text" name="noteName" id="note-name" required />
            <textarea
              className="note-textbox"
              aria-label="note content"
              placeholder="Make a Note"
              name="noteContent"
            />
            <div>
              <label>
                Select a folder:{" "}
                <select 
                className="selectbox" 
                name="folderId">{this.folderOptions()}
                </select>
              </label>
            </div>
          </div>

          <button className="submit-button" type="submit">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default AddNote