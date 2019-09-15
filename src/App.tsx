import React, { useEffect } from 'react';

import './App.css';
import firebase from './firebase';

const db = firebase.firestore();

const App: React.FC = () => {
  useEffect(() => {
    db.collection('test').add({ name: 'test' });
  }, []);

  return <div>test</div>;
};

export default App;
