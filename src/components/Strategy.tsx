import React from 'react';

interface StrategyProps {
  text?: string;
}

export const defaultStrategies = [
  'ガンガンいこうぜ',
  'バッチリがんばれ',
  'おれにまかせろ',
  'じゅもんつかうな',
  'いのちだいじに',
  'めいれいさせろ',
];
export const letterSpacing = 8;

const Strategy: React.FC<StrategyProps> = ({ children, text }) => {
  return (
    <div
      className="nes-container is-rounded is-dark text-left with-title h4 overlow-hidden"
      style={{ letterSpacing }}
    >
      {defaultStrategies.map((strategy, i) => (
        <p className="ml-5 my-2" key={i}>
          {strategy}
        </p>
      ))}
      {!text ? (
        children
      ) : (
        <div className="nes-field is-inline">
          ▶<span className="ml-3">{text}</span>
        </div>
      )}
    </div>
  );
};

export default Strategy;
