import React from 'react';

interface StrategyProps {
  text?: string;
}

const Strategy: React.FC<StrategyProps> = ({ children, text }) => {
  return (
    <div className="nes-container is-rounded is-dark text-left">
      <p className="ml-4 my-2">ガンガンいこうぜ</p>
      <p className="ml-4 my-2">バッチリがんばれ</p>
      <p className="ml-4 my-2">おれにまかせろ</p>
      <p className="ml-4 my-2">じゅもんつかうな</p>
      <p className="ml-4 my-2">いのちだいじに</p>
      <p className="ml-4 my-2">めいれいさせろ</p>
      {!text ? (
        children
      ) : (
        <div className="nes-field is-inline">
          ▶<span className="ml-2">{text}</span>
        </div>
      )}
    </div>
  );
};

export default Strategy;
