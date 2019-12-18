import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import NotesList from '../NotesList/NotesList';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

class Home extends React.Component {

    render() {
        return (
            <main className="main-container">
                <ErrorBoundary message="Couldnt find the folders list! Try to make a folder!">
                    <Sidebar />
                </ErrorBoundary>
                <ErrorBoundary message="Couldnt find the notes list! Try to make a note!">
                    <NotesList />
                </ErrorBoundary>
            </main>
        )
    }
}

export default Home;