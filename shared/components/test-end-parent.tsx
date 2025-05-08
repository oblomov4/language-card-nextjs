'use client';

import { SelectCard } from '@/db/schema';
import React from 'react';
import { ServerResponseType } from '../lib/difinitions';
import { TestEnd } from './test-end';
import { CardMistake } from './card-mistake';
import { ButtonAddCollection } from './button-add-collection';
import Link from 'next/link';

interface Props {
  className?: string;
  truth: number[];
  mistakeList: SelectCard[];
}

export const TestEndParent: React.FC<Props> = ({ mistakeList, truth }) => {
  const [serverResponse, setServerResponse] = React.useState<ServerResponseType>({});
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (serverResponse.err || serverResponse.success) {
    return (
      <>
        {serverResponse?.success && <p className="subtitle"> {serverResponse.success}</p>}
        {serverResponse?.err && <p className="subtitle">{serverResponse.err}</p>}
        <Link href="/testing"></Link>
      </>
    );
  }

  return (
    <div className="test-end-wrapper">
      <TestEnd truth={truth} errList={mistakeList} />
      <ButtonAddCollection errList={mistakeList} setServerResponse={setServerResponse} />
      {mistakeList.length != 0 && <h2 className="subtitle">Ваши ошибки:</h2>}
      {mistakeList.map((err) => (
        <CardMistake
          wordOne={err.wordOne}
          wordClue={err.wordClue}
          wordTwo={err.wordTwo}
          key={err.id}
        />
      ))}
    </div>
  );
};
