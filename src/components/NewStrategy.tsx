import React, { useState, useContext, useRef } from 'react';
import * as H from 'history';
import html2canvas from 'html2canvas';

import Layout from './Layout';
import Strategy from './Strategy';
import firebase from '../firebase';
import { FirebaseContext } from '../FirebaseAuth';

const db = firebase.firestore();

interface NewStrategyProps {
  history: H.History;
}

const NewStrategy: React.FC<NewStrategyProps> = ({ history }) => {
  const { uid, screenName } = useContext(FirebaseContext);
  const [text, setText] = useState<string>('');
  const previewEl = useRef(null);

  const onChangeText = (e: React.FormEvent<HTMLInputElement>) =>
    setText(e.currentTarget.value);
  const onClickSave = async () => {
    const canvas = await html2canvas(previewEl.current!);
    console.log(canvas);
    console.log(canvas.toDataURL());
    window.open(canvas.toDataURL());
    return;
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
          className={`nes-btn h3 ${(!uid || !text.length) && 'is-disabled'}`}
          onClick={onClickSave}
          disabled={!uid || !text.length}
        >
          ほぞんする
        </button>
      </p>
      <div className="">
      <div
        ref={previewEl}
        className="d-flex justify-content-center align-items-center flex-column position-fixed"
        style={{ background: '#212529', width: 1200, height: 630, left: 0 }}
      >
        <h2 className="text-light">@{screenName}の　さくせん</h2>
        <div
          className="h4"
          style={{ width: 700, height: 400, lineHeight: 2 }}
        >
          <Strategy text={text.length ? text : ' '} />
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default NewStrategy;
