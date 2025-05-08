import React from 'react';

interface Props {
  wordOne: string;
  wordClue: string;
  wordTwo: string;
}

export const CardMistake: React.FC<Props> = ({ wordOne, wordClue, wordTwo }) => {
  return (
    <div className="look">
      <div className="look__wrapper">
        <span className="look__wrapper-span">Eng:</span>
        <span className="look__wrapper-word">{wordOne}</span>
      </div>
      <div className="look__wrapper">
        <span className="look__wrapper-span">Clue:</span>
        <span className="look__wrapper-word">{wordClue}</span>
      </div>
      <div className="look__wrapper">
        <span className="look__wrapper-span">Ru:</span>
        <span className="look__wrapper-word">{wordTwo}</span>
      </div>
    </div>
  );
};
