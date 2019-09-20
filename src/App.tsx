import React from 'react';

import './App.css';
import FirebaseAuth from './FirebaseAuth';
import Header from './Header';

const App: React.FC = () => {
  return (
    <FirebaseAuth>
      <Header />
    </FirebaseAuth>
  );
};

export default App;
