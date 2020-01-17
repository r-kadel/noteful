import React from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Home/Home";
import NoteDetail from "./NoteDetail/NoteDetail";
import NoteContext from "./NoteContext";
import AddFolder from './AddFolder/AddFolder'
import AddNote from './AddNote/AddNote'

const API_ENDPOINT = "https://boiling-crag-74706.herokuapp.com/api"

class App extends React.Component {
  state = {
    notes: [],
    folders: [],
    folderId: null
  };
  
  componentDidMount() {
    Promise.all([
      fetch(`${API_ENDPOINT}/notes`),
      fetch(`${API_ENDPOINT}/folders`)
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
    fetch(`${API_ENDPOINT}/notes/${id}`, {
      method: "DELETE",
      headers: {
				'content-type': 'application/json'
			}
    })
      .then(res => res.json())
      .then(res => console.log(res));
  };

	addFolder = (folder, id) => {
    const newFolders = [...this.state.folders, {name: folder, id: id}]
    this.setState({ folders: newFolders })

		fetch(`${API_ENDPOINT}/folders`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ folder_name: folder })
		})
			.then(res => res.json())
			.catch(err => {
				console.log(err)
			})
  }
  
  addNote = note => {
      const newNotes = [...this.state.notes, note]
      this.setState({ notes: newNotes })
    
		fetch(`${API_ENDPOINT}/notes`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(note)
		})
			.then(res => res.json())
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
            component={NoteDetail}
          />
        </div>
      </NoteContext.Provider>
    );
  }
}

export default App;
