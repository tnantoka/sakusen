import React, { useState, useContext, useRef, useEffect } from 'react';
import * as H from 'history';

import Layout from './Layout';
import Strategy, { defaultStrategies, letterSpacing } from './Strategy';
import firebase from '../firebase';
import { FirebaseContext } from '../FirebaseAuth';

const db = firebase.firestore();
const storage = firebase.storage();

interface NewStrategyProps {
  history: H.History;
}

const NewStrategy: React.FC<NewStrategyProps> = ({ history }) => {
  const { uid, screenName } = useContext(FirebaseContext);
  const [text, setText] = useState<string>('');
  const textEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    textEl.current!.focus();
  }, []);

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

    await storage
      .ref(`users/${uid}/strategies/${ref.id}`)
      .putString(generateImageDataURL(screenName!, text!), 'data_url');

    history.push(`/s/${ref.id}`);
  };

  return (
    <Layout title="さくせんをねる">
      <div className="my-3">
        <Strategy>
          <div className="nes-field is-inline d-flex">
            ▶
            <input
              type="text"
              className="nes-input is-dark ml-2 border-0"
              placeholder="あなたのさくせん"
              onChange={onChangeText}
              value={text}
              ref={textEl}
              style={{ letterSpacing, fontFeatureSettings: '"ss01"' }}
              maxLength={10}
            />
          </div>
        </Strategy>
      </div>
      <p className="my-5">
        <button
          className={`nes-btn h3 is-primary ${(!uid || !text.length) && 'is-disabled'}`}
          onClick={onClickSave}
          disabled={!uid || !text.length}
        >
          ほぞんする
        </button>
      </p>
    </Layout>
  );
};

const generateImageDataURL = (screenName: string, text: string): string => {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 630;
  const context = canvas.getContext('2d')!;

  context.fillStyle = '#212529';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = 'white';
  context.textAlign = 'center';
  context.font = '48px NuKinakoMochiFw-Reg';
  context.fillText(`@${screenName}のさくせん`, canvas.width / 2, 80);

  context.font = '20px NuKinakoMochiFw-Reg';
  const frames = [
    `┌${'┬'.repeat(30)}┐`,
    ...Array(22).fill(`├${'　'.repeat(30)}┤`),
    `└${'┴'.repeat(30)}┘`,
  ];

  const textTop = 180;
  const textLeft = 360;

  frames.forEach((frame, i) => {
    context.fillText(frame, canvas.width / 2, textTop - 50 + 20 * i);
  });

  context.font = '34px NuKinakoMochiFw-Reg';
  context.textAlign = 'left';
  defaultStrategies.forEach((strategy, i) => {
    strategy.split('').forEach((character, j) => {
      context.fillText(character, textLeft + 50 * j, textTop + 60 * i);
    });
  });
  context.fillText('▶', textLeft - 50, textTop + 60 * defaultStrategies.length);
  text.split('').forEach((character, j) => {
    context.fillText(
      character,
      textLeft + 50 * j,
      textTop + 60 * defaultStrategies.length
    );
  });

  return canvas.toDataURL();
};

export default NewStrategy;
