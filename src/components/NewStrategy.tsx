import React, { useState, useContext } from 'react';
import * as H from 'history';

import Layout from './Layout';
import Strategy from './Strategy';
import firebase from '../firebase';
import { FirebaseContext } from '../FirebaseAuth';

const db = firebase.firestore();

interface NewStrategyProps {
  history: H.History;
}

const NewStrategy: React.FC<NewStrategyProps> = ({ history }) => {
  const { uid } = useContext(FirebaseContext);
  const [text, setText] = useState<string>('');

  const onChangeText = (e: React.FormEvent<HTMLInputElement>) =>
    setText(e.currentTarget.value);
  const onClickSave = async () => {
    if (!uid) {
      return;
    }
    const ref = await db.collection('strategies').add({
      text,
      profile: {
        ref: db.doc(`profiles/${uid}`),
      },
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    history.push(`/s/${ref.id}`);
  };

  return (
    <Layout>
      <Strategy>
        <div className="nes-field is-inline">
          ▶
          <input
            type="text"
            className="nes-input is-dark ml-2"
            placeholder="あなたのさくせん"
            onChange={onChangeText}
            value={text}
          />
        </div>
      </Strategy>
      <p>
        <button
          className={`nes-btn h3 ${!uid && !text.length && 'is-disabled'}`}
          onClick={onClickSave}
          disabled={!uid || !text.length}
        >
          ほぞんする
        </button>
      </p>
    </Layout>
  );
};

export default NewStrategy;
