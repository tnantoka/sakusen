import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import './App.css';
import FirebaseAuth from './FirebaseAuth';
import Home from './components/Home';
import NewStrategy from './components/NewStrategy';
import ShowStrategy from './components/ShowStrategy';

const App: React.FC = () => {
  return (
    <FirebaseAuth>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/new" component={NewStrategy} />
          <Route path="/s/:sid" component={ShowStrategy} />
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </FirebaseAuth>
  );
};

export default App;
