import React, { useEffect, useState } from 'react';

import firebase from './firebase';

const db = firebase.firestore();

interface FirebaseContextState {
  uid: string | null;
  displayName: string | null;
  photoURL: string | null;
  screenName: string | null;
}

export const FirebaseContext = React.createContext<FirebaseContextState>({
  uid: null,
  displayName: null,
  photoURL: null,
  screenName: null,
});

export const FirebaseAuth: React.FC = ({ children }) => {
  const [uid, setUid] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [screenName, setScreenName] = useState<string | null>(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        return;
      }
      const unsubscribe = db
        .doc(`profiles/${user.uid}`)
        .onSnapshot(snapshot => {
          if (!snapshot.exists) {
            return;
          }
          setUid(user.uid);
          setDisplayName(snapshot.get('displayName'));
          setPhotoURL(snapshot.get('photoURL'));
          setScreenName(snapshot.get('screenName'));
          unsubscribe();
        });
    });
  }, []);

  useEffect(() => {
    firebase
      .auth()
      .getRedirectResult()
      .then(async result => {
        if (!result || !result.additionalUserInfo) {
          return;
        }
        const { additionalUserInfo } = result;
        const user = result.user!;

        const profile: any = additionalUserInfo.profile;
        const displayName = profile.name;
        const screenName = additionalUserInfo.username;
        const photoURL = profile.profile_image_url_https!;

        const batch = db.batch();
        if ((await db.doc(`users/${user.uid}`).get()).exists) {
          await user.updateProfile({ displayName, photoURL });
          await user.getIdToken(true);

          batch.update(db.doc(`users/${user.uid}`), {
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          });

          batch.update(db.doc(`profiles/${user.uid}`), {
            displayName,
            photoURL,
            screenName,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
        } else {
          batch.set(db.doc(`users/${user.uid}`), {
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          });

          batch.set(db.doc(`profiles/${user.uid}`), {
            displayName,
            photoURL,
            screenName,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
        }
        await batch.commit();

        setUid(user.uid);
        setDisplayName(displayName);
        setPhotoURL(photoURL);
        setScreenName(screenName!);
      })
      .catch(e => {
        if (e.code !== 'auth/user-cancelled') {
          throw e;
        }
      });
  }, []);
  return (
    <FirebaseContext.Provider
      value={{ uid, displayName, photoURL, screenName }}
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

export const deactivate = async () => {
  const user = firebase.auth().currentUser!;

  const batch = db.batch();
  batch.delete(db.doc(`users/${user.uid}`));
  batch.delete(db.doc(`profiles/${user.uid}`));
  await batch.commit();

  try {
    await firebase.auth().currentUser!.delete();
  } catch(e) {
    if (e.code !== 'auth/requires-recent-login') {
      throw e;
    }
  }

  window.location.href = '/';
};

export default FirebaseAuth;
