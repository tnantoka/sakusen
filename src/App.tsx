import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';
import FirebaseAuth from './FirebaseAuth';
import Home from './components/Home';
import NewStrategy from './components/NewStrategy';
import ShowStrategy from './components/ShowStrategy';

const App: React.FC = () => {
  return (
    <FirebaseAuth>
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/new" component={NewStrategy} />
        <Route path="/s/:sid" component={ShowStrategy} />
      </Router>
    </FirebaseAuth>
  );
};

export default App;
