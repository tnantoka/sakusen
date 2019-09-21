import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Layout from './Layout';
import Strategy from './Strategy';
import firebase from '../firebase';

const db = firebase.firestore();

const PER_PAGE = 2;

const App: React.FC = () => {
  const [strategies, setStrategies] = useState<
    firebase.firestore.QueryDocumentSnapshot[]
  >([]);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    db.collection('strategies')
      .orderBy('createdAt', 'desc')
      .limit(PER_PAGE)
      .get()
      .then(snapshots => {
        setStrategies(snapshots.docs);
        setHasNextPage(snapshots.docs.length === PER_PAGE);
      });
  }, []);

  const onClickMore = () => {
    db.collection('strategies')
      .orderBy('createdAt', 'desc')
      .limit(PER_PAGE)
      .startAfter(strategies[strategies.length - 1])
      .get()
      .then(snapshots => {
        setStrategies([...strategies, ...snapshots.docs]);
        setHasNextPage(snapshots.docs.length === PER_PAGE);
      });
  };

  return (
    <Layout>
      <p>
        <Link to="/new" className="nes-btn is-primary h3">
          さくせんをねる
        </Link>
      </p>
      {strategies.map(snapshot => (
        <Link key={snapshot.id} to={`/s/${snapshot.id}`}>
          <Strategy key={snapshot.id}>
            <div className="nes-field is-inline">
              ▶<span className="ml-2">{snapshot.get('text')}</span>
            </div>
          </Strategy>
        </Link>
      ))}
      {hasNextPage && (
        <p>
          <button className="nes-btn h3" onClick={onClickMore}>
            もっとみる
          </button>
        </p>
      )}
    </Layout>
  );
};

export default App;
