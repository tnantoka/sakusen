import React, { useEffect, useState } from 'react';

import firebase from './firebase';

interface FirebaseContextState {
  uid: string | null;
  displayName: string | null;
}

export const FirebaseContext = React.createContext<FirebaseContextState>({
  uid: null,
  displayName: null,
});

export const FirebaseAuth: React.FC = ({ children }) => {
  const [uid, setUid] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        return;
      }
      console.log(user.providerData);
      setUid(user.uid || null);
      setDisplayName(user.displayName || null);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    firebase
      .auth()
      .getRedirectResult()
      .then(result => {
        if (!result || !result.additionalUserInfo) {
          return;
        }
        console.log(result.additionalUserInfo.username);
      });
  }, []);
  return (
    <FirebaseContext.Provider
      value={{ uid, displayName }}
      children={children}
    />
  );
};

export const signIn = () => {
  const provider = new firebase.auth.TwitterAuthProvider();
  firebase.auth().signInWithRedirect(provider);
};

export const signOut = () => {
  firebase.auth().signOut();
  window.location.href = '/';
};

export default FirebaseAuth;
