import React, { useEffect, useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Layout from './Layout';
import Strategy from './Strategy';
import firebase from '../firebase';
import { FirebaseContext } from '../FirebaseAuth';

interface ShowStrategyProps extends RouteComponentProps<{ sid: string }> {}

const db = firebase.firestore();
const storage = firebase.storage();

const ShowStrategy: React.FC<ShowStrategyProps> = ({
  match: {
    params: { sid },
  },
  history,
}) => {
  const [text, setText] = useState('');
  const [screenName, setScreenName] = useState('');
  const [isOwner, setIsOwner] = useState(false);

  const { uid } = useContext(FirebaseContext);

  useEffect(() => {
    db.doc(`/strategies/${sid}`)
      .get()
      .then(async snapshot => {
        setText(snapshot.get('text'));
        setScreenName(
          (await snapshot.get('profile.ref').get()).get('screenName')
        );
        setIsOwner(snapshot.get('profile.ref').path.endsWith(uid));
      })
      .catch(() => {
        history.push('/');
      });
  }, [sid, uid, history]);

  const onClickDelete = async () => {
    if (!uid) {
      return;
    }
    if (!window.confirm('削除します。よろしいですか？')) {
      return;
    }
    await db.doc(`strategies/${sid}`).delete();
    await storage.ref(`users/${uid}/strategies/${sid}`).delete();

    history.push(`/`);
  };

  return (
    <Layout>
      <h1>
        <a href={`https://twitter.com/${screenName}`}>
          @{screenName}の　さくせん
        </a>
      </h1>
      <Strategy text={text} />
      <p>
        <a
          className="nes-btn h3 is-primary"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `さくせんを　へんこう　しました\n` +
              window.location.href.replace('/s/', '/share/')
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          つぶやく
        </a>
      </p>
      {isOwner && (
        <p>
          <button className="nes-btn h3 is-error" onClick={onClickDelete}>
            さくじょする
          </button>
        </p>
      )}
    </Layout>
  );
};

export default ShowStrategy;
