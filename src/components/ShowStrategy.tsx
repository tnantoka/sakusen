import React, { useEffect, useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

import Layout from './Layout';
import firebase from '../firebase';
import { FirebaseContext } from '../FirebaseAuth';

interface ShowStrategyProps extends RouteComponentProps<{ sid: string }> {}

const db = firebase.firestore();

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
      });
  }, [sid, uid]);

  const onClickDelete = async () => {
    if (!window.confirm('この作戦を削除します。よろしいですか？')) {
      return;
    }
    await db.doc(`strategies/${sid}`).delete();
    history.push(`/`);
  };
  return (
    <Layout>
      <Container>
        <Row>
          <Col xs={12} md={{ size: 8, offset: 2 }} className="px-0">
            <h1>
              <a href={`https://twitter.com/${screenName}`}>@{screenName}</a>
            </h1>
            <div className="nes-container is-rounded is-dark">
              <p className="ml-4 my-2">ガンガンいこうぜ</p>
              <p className="ml-4 my-2">バッチリがんばれ</p>
              <p className="ml-4 my-2">おれにまかせろ</p>
              <p className="ml-4 my-2">じゅもんつかうな</p>
              <p className="ml-4 my-2">いのちだいじに</p>
              <p className="ml-4 my-2">めいれいさせろ</p>

              <div className="nes-field is-inline">
                ▶<span className="ml-2">{text}</span>
              </div>
            </div>
            {isOwner && (
              <p className="text-center">
                <button className="nes-btn h3 is-error" onClick={onClickDelete}>
                  さくじょする
                </button>
              </p>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ShowStrategy;
