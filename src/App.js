import React from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import STORE from './dummy-store';
import NoteDetail from './NoteDetail/NoteDetail';
import NoteContext from './NoteContext'

class App extends React.Component {
  state = {
    notes: STORE.notes,
    folders: STORE.folders,
    folderId: null
  }
  
// componentDidMount() {
//   fetch('')
//   .then(res => res.json())
//   .then( res => this.setState({
//     store: res.message
//   }))
//   .catch( err => err.message)
// }


updateFolderId = (id) => {
  this.setState({
    folderId: id
  })
}


  render() {

    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      updateFolderId: this.updateFolderId,
      folderId: this.state.folderId
    }

    return (
      <NoteContext.Provider value={value}>
      <div className="App">
        <h1 className="main-header" onClick={ () => this.setState({folderId: null})}><Link to="/" style={{ cursor: 'pointer', textDecoration: 'none' }}>Noteful</Link></h1>
        
          <Route
            exact path='/'
            render={() =>
              <Home />}
          />
          <Route
            path='/folder/:folderId'
            component={Home} />
          
          <Route
            path='/note/:noteId'
            render={(props) => <NoteDetail store={this.state.store} noteId={props.match.params.noteId} goBack={() => props.history.goBack()} />}
          />
        
      </div>
      </NoteContext.Provider>
    );
  }
  
}

export default App;
