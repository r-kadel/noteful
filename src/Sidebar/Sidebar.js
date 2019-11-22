import React from 'react';
import Folder from '../Folder/Folder';
import './Sidebar.css';

class Sidebar extends React.Component {
    render() {
        const folders = this.props.folders.map((folder, i) => {
            return (
                <Folder name={folder.name} key={i} folderId={folder.id} className={(this.props.folderId === folder.id) ? "selected-folder" : ""} />
            );
        });
        
        return (
            <div className="folders-list">
                {folders}
                <button className="add-folder-button" type="button">Add a folder</button>
            </div>
        )
    }
}

export default Sidebar;