import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import NotesList from '../NotesList/NotesList';

class Home extends React.Component {

    render() {
        return (
            <main className="main-container">
                <Sidebar />
                <NotesList />
            </main>
        )
    }
}

export default Home;