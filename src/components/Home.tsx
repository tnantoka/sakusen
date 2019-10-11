import React, { useState, useEffect, useContext } from 'react';
import * as H from 'history';
import { Link } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';

import Layout from './Layout';
import Strategy from './Strategy';
import firebase from '../firebase';
import { FirebaseContext } from '../FirebaseAuth';

const db = firebase.firestore();

const PER_PAGE = 2;

interface HomeProps {
  history: H.History;
}

const Home: React.FC<HomeProps> = ({ history }) => {
  const [strategies, setStrategies] = useState<
    firebase.firestore.QueryDocumentSnapshot[]
  >([]);
  const [hasNextPage, setHasNextPage] = useState(false);

  const { uid } = useContext(FirebaseContext);

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

  const onClickNewStrategy = () => {
    if (!uid) {
      return;
    }
    history.push('/new');
  };

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
      <p className="my-5">
        <span id="newStrategy" className="d-block pl-1 pr-3">
          <button
            className={`nes-btn is-primary h3 w-100 ${!uid && 'is-disabled'}`}
            onClick={onClickNewStrategy}
          >
            さくせんをねる
          </button>
        </span>
        {!uid && (
          <UncontrolledTooltip placement="top" target="newStrategy">
            <span className="nes-text">ログインしてください</span>
          </UncontrolledTooltip>
        )}
      </p>
      {strategies.map(snapshot => (
        <Link
          key={snapshot.id}
          to={`/s/${snapshot.id}`}
          className="text-decoration-none d-block my-4"
        >
          <Strategy key={snapshot.id} text={snapshot.get('text')} />
        </Link>
      ))}
      {hasNextPage && (
        <p className="py-5 pl-1 pr-3">
          <button className="nes-btn w-100 h3" onClick={onClickMore}>
            もっとみる
          </button>
        </p>
      )}
    </Layout>
  );
};

export default Home;
