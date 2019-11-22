import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import NotesList from '../NotesList/NotesList';

class Home extends React.Component {
    render() {
        console.log(`Home props`, this.props);
        return (
            <main className="main-container">
                <Sidebar folders={this.props.store.folders} folderId={this.props.folderId} />
                <NotesList notes={this.props.store.notes} folderId={this.props.folderId} />
            </main>
        )
    }
}

export default Home;