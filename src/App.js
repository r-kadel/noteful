import React from "react"
import { Route, Link } from "react-router-dom"
import "./App.css"
import Home from "./Home/Home"
import NoteDetail from "./NoteDetail/NoteDetail"
import NoteContext from "./NoteContext"
import AddFolder from "./AddFolder/AddFolder"
import AddNote from "./AddNote/AddNote"

const API_ENDPOINT = "https://boiling-crag-74706.herokuapp.com/api"

class App extends React.Component {
  state = {
    notes: [],
    folders: [],
    folderId: null
  }

	fetchNotes = () => {
		fetch(`${API_ENDPOINT}/notes`)
      .then(res => res.json())
			.then(resJSON => this.setState({ notes: resJSON }))
			.catch(err => {
				console.log(err)
			})
  }

  fetchFolders = () => {
		fetch(`${API_ENDPOINT}/folders`)
      .then(res => res.json())
      .then(resJSON => this.setState({ folders: resJSON }))
			.catch(err => {
				console.log(err)
			})
	}
  componentDidMount() {
    this.fetchFolders()
    this.fetchNotes()
  }

  updateFolderId = id => {
    this.setState({
      folderId: id
    })
  }

  handleDelete = id => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    })
    fetch(`${API_ENDPOINT}/notes/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
  }

  addFolder = (folder, id) => {
 
    fetch(`${API_ENDPOINT}/folders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ folder_name: folder })
    })
    .then(this.fetchFolders)
      .catch(err => {
        console.log(err)
      })
  }

  addNote = note => {
    fetch(`${API_ENDPOINT}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(note)
    })
    .then(this.fetchNotes)
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
    }

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
          <Route path="/note/:noteId" component={NoteDetail} />
        </div>
      </NoteContext.Provider>
    )
  }
}

export default App
