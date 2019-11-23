import React from 'react';
import { Link } from 'react-router-dom';
import './Folder.css';

class Folder extends React.Component {
    render() {
        return (
            <div className={`folder ${this.props.className}`}>
                <h3 className="folder-name">
                    <Link style={{ textDecoration: 'none' }} to={`/folder/${this.props.folderId}`}>
                        Folder {this.props.name}
                    </Link>
                </h3>
            </div>
        )
    }
}

export default Folder;