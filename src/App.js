import './App.css';
import Main from './Components/Main';
import PirateForm from './Components/PirateForm';

import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Detail from './Components/Detail';
import Update from './Components/Update';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>PIRATE CREW</h1>
      </header>
          <BrowserRouter>
            <Link to="/pirates/">Home</Link>
            {'|'}
            <Link to="/pirates/create/new">Create Pirate</Link>
            <Switch>
              <Route exact path="/pirates/">
                <Main />
              </Route>
              <Route exact path='/pirates/create/new'>
                <PirateForm/>
              </Route>
              <Route path="/pirates/:id/edit">
                <Update />
              </Route>
              <Route path="/pirates/:id">
                <Detail />
              </Route>
              </Switch>
          </BrowserRouter>
    </div>
  );
}

export default App;