import React, { Component } from "react";
import './AddFolder.css'
import NoteContext from '../NoteContext'
import {Link} from 'react-router-dom'

class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: ""
    };
  }
  static contextType = NoteContext;

  render() {
    return (
     <div className='form-container'>
      <button className='back-button' onClick={() => this.props.history.goBack()} >
        Go Back
      </button>
      <form className="add-folder">
        <h2>Add a folder</h2>
        <div className="form-group">
          <label htmlFor="name"> New Folder Name: </label>
          <br />
          <input type="text" name="name" id="name" required/>
        </div>    
         <Link to='/'>
          <button 
            className='submit-button' 
            type="submit" 
            // onClick={}
            >
            Save
          </button>
         </Link>
      </form>

   </div>
    );
  }
}

export default AddFolder;
