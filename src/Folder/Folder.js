import React from "react";
import { Link } from "react-router-dom";
import "./Folder.css";
import NoteContext from "../NoteContext";

class Folder extends React.Component {
  static contextType = NoteContext;

  render() {
    return (
      <div className={`folder selected`}>
        <h3
          className="folder-name"
          onClick={() => this.context.updateFolderId(this.props.folderId)}
        >
          <Link
            style={{ textDecoration: "none" }}
            to={`/folder/${this.props.folderId}`}
          >
            {this.props.name}
          </Link>
        </h3>
      </div>
    );
  }
}

export default Folder;
