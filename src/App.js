import React from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./Home/Home";
import NoteDetail from "./NoteDetail/NoteDetail";
import NoteContext from "./NoteContext";

class App extends React.Component {
  state = {
    notes: [],
    folders: [],
    folderId: null
  };

  componentDidMount() {
    Promise.all([
      fetch("http://localhost:9090/notes"),
      fetch("http://localhost:9090/folders")
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

  // handleDelete = id => {
  //   fetch(`http://localhost:9090/notes/${id}`, {
  //     method: "DELETE"
  //   })
  //     .then(res => res.json())
  //     .then(res => console.log(res));
  // };

  handleDelete = id => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)        
    });
};

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      updateFolderId: this.updateFolderId,
      folderId: this.state.folderId,
      handleDelete: this.handleDelete
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

          <Route exact path="/" render={() => <Home />} />
          <Route path="/folder/:folderId" component={Home} />

          <Route
            path="/note/:noteId"
            render={props => (
              <NoteDetail
                store={this.state.store}
                noteId={props.match.params.noteId}
                goBack={() => props.history.goBack()}
              />
            )}
          />
        </div>
      </NoteContext.Provider>
    );
  }
}

export default App;
