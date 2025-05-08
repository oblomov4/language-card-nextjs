'use client';

import React from 'react';
import { TestCard } from './test-card';
import { SelectCard } from '@/db/schema';
import { TestEndParent } from './test-end-parent';

interface Props {
  userTestCards: SelectCard[];
  wordLanguage: string;
}

export const TestCardsParent: React.FC<Props> = ({ userTestCards, wordLanguage }) => {
  const [truth, setTruth] = React.useState<number[]>([]);
  const [testEnd, setTestEnd] = React.useState(false);
  const [mistakeList, setMistakeList] = React.useState<SelectCard[]>([]);

  function finishTest() {
    if (truth.length === 0) {
      setMistakeList(userTestCards);
    } else {
      const newMistakeList: SelectCard[] = [];
      for (let i = 0; i < userTestCards.length; i++) {
        if (!truth.includes(userTestCards[i].id)) {
          newMistakeList.push(userTestCards[i]);
        }
      }
      setMistakeList(newMistakeList);
    }
    setTestEnd(true);
  }

  return (
    <>
      {!testEnd && (
        <>
          {' '}
          {userTestCards.map((card) => (
            <TestCard
              key={card.id}
              wordOne={card.wordOne}
              wordClue={card.wordClue}
              wordTwo={card.wordTwo}
              id={card.id}
              wordLanguage={wordLanguage}
              truth={truth}
              setTruth={setTruth}
            />
          ))}
          <div className="endTest">
            <button className="endTest__button" onClick={() => finishTest()}>
              Закончить тестирование!
            </button>
          </div>
        </>
      )}

      {testEnd && <TestEndParent truth={truth} mistakeList={mistakeList} />}
    </>
  );
};
