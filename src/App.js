import React from 'react';
import './App.css';
import NewForm from './components/NewForm'
import Display from './components/Display'
import { Route, Link, Switch } from "react-router-dom";

// if (process.env.NODE_ENV === "development") {
//   baseURL = "http://localhost:3003";
// } else {
//   baseURL = "https://fathomless-sierra-68956.herokuapp.com";
// }
let baseURL = "http://localhost:3003";
console.log("current base URL:", baseURL);


const url = baseURL + "/bookmarks"



function App() {
  const [state, setState] = React.useState({
    bookmarks: [],
    bookmark: {}
  })
  
  const getBookmark = bookmark => {
    setState({ ...state, bookmark });
  };

  // why use fat arrows here?...ans: to bind to the class
  const getBookmarks = () => {
    fetch(url)
      .then(
        data => data.json(),
        err => console.log("data", err)
      )
      .then(
        parsedData =>
          // parsedData.sort((a,b) => a < b)
          setState({ ...state, bookmarks: parsedData }),
        err => console.log("parsedData", err)
      );
  };
  
  React.useEffect(()=>{
    getBookmarks()
  }, [])

  //handle create to create dogs
  const handleCreate = (id, bookmark) => {
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(bookmark)
    }).then(response => {
      getBookmarks()
    })
  }

  //handle create to create dogs
  const handleUpdate = (id, bookmark) => {
    fetch(baseURL + "/bookmarks/" + id, {
      method: "put",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(bookmark)
    }).then(response => {
      getBookmarks()
    })
  }

  const deleteBookmark = id => {
    fetch(baseURL + "/bookmarks/" + id, {
      method: "DELETE"
    }).then(res => {
  
      const bookmarksArr = state.bookmarks.filter(bookmark => {
        return bookmark._id !== id;
      });
      setState({ ...state, bookmarks: bookmarksArr });
    });
  };
  
  
  console.log(state.bookmarks)

  return (
    <main>
    <div>
      <h1 style={{textAlign:"center"}}>Bookmarkd</h1>
      
      <Switch>
      <Route exact path="/" render={(rp) => <Display {...rp} bookmarks={state.bookmarks} deleteBookmark={deleteBookmark} />} />
      <Route exact
            path="/create"
            render={(rp) => (
      <NewForm baseURL={baseURL} {...rp} label="create" bookmark={{}} handleSubmit={handleCreate}></NewForm>
      )}
      />
          <Route
            exact
            path="/:id"
            render={(rp) => (
              <NewForm {...rp} label="update" bookmark={state.bookmarks} handleSubmit={handleUpdate}/>
            )}
            />
        
      </Switch>
    </div>
    </main>
  );
}


export default App;
