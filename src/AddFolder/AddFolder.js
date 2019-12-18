import React, { Component } from "react";
import './AddFolder.css'
import NoteContext from '../NoteContext'

class AddFolder extends Component {

  static contextType = NoteContext;

  // Need to finish the POST request first
  // I need to update APP component function to post an ID as well as name
  // Get Name from user input and find a way to random generate an ID on submit
  // Then post to server

  handleSubmit = (e) => {
    e.preventDefault()
    this.context.addFolder(e.target.folderName.value)
    this.props.history.goBack()
  }

  render() {
    return (
     <div className='form-container'>
      <button className='back-button' onClick={() => this.props.history.goBack()} >
        Go Back
      </button>
      <form className="add-folder" onSubmit={ e => this.handleSubmit(e)} >
        <h2>Add a folder</h2>
        <div className="form-group">
          <label htmlFor="folderName"> New Folder Name: </label>
          <br />
          <input type="text" name="folderName" id="name" required/>
        </div>  
              
          <button 
            className='submit-button' 
            type="submit"           
            >
            Save
          </button>
      </form>
   </div>
    );
  }
}

export default AddFolder;
