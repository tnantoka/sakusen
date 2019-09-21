import React from 'react';
import { Link } from 'react-router-dom';

import Layout from './Layout';

const App: React.FC = () => {
  const onClickMore = () => {};

  return (
    <Layout>
      <div className="text-center">
        <p>
          <Link to="/new" className="nes-btn is-primary h3">
            さくせんをねる
          </Link>
        </p>
        <p>
          <button className="nes-btn h3" onClick={onClickMore}>
            もっとみる
          </button>
        </p>
      </div>
    </Layout>
  );
};

export default App;
