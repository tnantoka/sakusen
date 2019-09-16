import React, { useContext } from 'react';

import { FirebaseContext, signInWithRedirect } from './FirebaseAuth';

const App: React.FC = () => {
  const { uid, displayName } = useContext(FirebaseContext);

  return (
    <>
      test uid: {uid}
      displayName: {displayName}
      <button onClick={signInWithRedirect}>sign in</button>
    </>
  );
};

export default App;
