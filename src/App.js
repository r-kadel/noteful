import React from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Home/Home";
import NoteDetail from "./NoteDetail/NoteDetail";
import NoteContext from "./NoteContext";
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote'

class App extends React.Component {
  state = {
    notes: [],
    folders: [],
    folderId: null
  };

  componentDidMount() {
    Promise.all([
      fetch("http://localhost:8000/api/notes"),
      fetch("http://localhost:8000/api/folders")
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then(e => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch(error => {
        console.error({ error });
      });
  }

  updateFolderId = id => {
    this.setState({
      folderId: id
    });
  };

  handleDelete = id => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    });
    fetch(`http://localhost:8000/notes/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(res => console.log(res));
  };

	addFolder = folderName => {
		fetch(`http://localhost:8000/folders`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name: folderName })
		})
			.then(res => res.json())
			.then(resJSON => {
				const newFolders = [...this.state.folders, resJSON]
				this.setState({ folders: newFolders })

			})
			.catch(err => {
				console.log(err)
			})
  }
  
  addNote = note => {
		fetch(`http://localhost:8000/notes`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(note)
		})
			.then(res => res.json())
			.then(newNote => {
				const newNotes = [...this.state.notes, newNote]
				this.setState({ notes: newNotes })

			})
			.catch(err => {
				console.log(err)
			})
	}

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      updateFolderId: this.updateFolderId,
      folderId: this.state.folderId,
      handleDelete: this.handleDelete,
      addFolder: this.addFolder,
      addNote: this.addNote
    };

    return (
      <NoteContext.Provider value={value}>
        <div className="App">
          <h1
            className="main-header"
            onClick={() => this.setState({ folderId: null })}
          >
            <Link to="/" style={{ cursor: "pointer", textDecoration: "none" }}>
              Noteful
            </Link>
          </h1>

          <Route exact path="/" component={Home} />
          <Route path="/folder/:folderId" component={Home} />
          <Route path="/addFolder" component={AddFolder} />
          <Route path="/addNote" component={AddNote} />
          <Route
            path="/note/:noteId"
            render={props => (
              <NoteDetail               
                noteId={props.match.params.noteId}
              />
            )}
          />
        </div>
      </NoteContext.Provider>
    );
  }
}

export default App;
