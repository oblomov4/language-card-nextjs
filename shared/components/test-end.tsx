import { SelectCard } from '@/db/schema';
import Link from 'next/link';
import React from 'react';

interface Props {
  className?: string;
  truth: number[];
  errList: SelectCard[];
}

export const TestEnd: React.FC<Props> = ({ truth, errList }) => {
  return (
    <div className="test-end">
      <p className="test-end__p">
        Количество правильных ответов: <span className="test-end__p-truth">{truth.length}</span>
      </p>
      <p className="test-end__p">
        Количество неправильных ответов:{' '}
        <span className="test-end__p-mistake">{errList.length}</span>
      </p>
      <div className="test-wrapper">
        <Link href="/testing" className="test-end__back">
          Назад
        </Link>
      </div>
    </div>
  );
};
