import React from 'react';
import { Link } from 'react-router-dom';
import './Folder.css';

class Folder extends React.Component {
    render() {
        return (
            <div className={`folder ${this.props.className}`}>
                <Link style={{ textDecoration: 'none' }} to={`/folder/${this.props.folderId}`}>
                    <h3 className="folder-name">Folder {this.props.name}</h3>
                </Link>
            </div>
        )
    }
}

export default Folder;