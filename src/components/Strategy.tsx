import React from 'react';

const Strategy: React.FC = ({ children }) => {
  return (
    <div className="nes-container is-rounded is-dark text-left">
      <p className="ml-4 my-2">ガンガンいこうぜ</p>
      <p className="ml-4 my-2">バッチリがんばれ</p>
      <p className="ml-4 my-2">おれにまかせろ</p>
      <p className="ml-4 my-2">じゅもんつかうな</p>
      <p className="ml-4 my-2">いのちだいじに</p>
      <p className="ml-4 my-2">めいれいさせろ</p>
      {children}
    </div>
  );
};

export default Strategy;
