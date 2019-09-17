import React, { useEffect } from 'react';

import './App.css';
import firebase from './firebase';
import FirebaseAuth from './FirebaseAuth';
import Header from './Header';

const db = firebase.firestore();

const App: React.FC = () => {
  useEffect(() => {
    // db.collection('test').add({ name: 'test' });
  }, []);
  return (
    <FirebaseAuth>
      <Header />
      test
    </FirebaseAuth>
  );
};

export default App;
