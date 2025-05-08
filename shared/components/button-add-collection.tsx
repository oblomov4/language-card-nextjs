import { SelectCard } from '@/db/schema';
import React from 'react';
import { queryApi } from '../lib/utils';

interface Props {
  errList: SelectCard[];
  setServerResponse: (value: { err?: string; success?: string }) => void;
}

export const ButtonAddCollection: React.FC<Props> = ({ errList, setServerResponse }) => {
  async function addRepeatCollection() {
    try {
      const res = await queryApi('/api/card-repeat-add', errList);
      setServerResponse(res);
    } catch (err) {
      console.log(err);
      setServerResponse({
        err: 'Что-то пошло не так!',
      });
    }
  }

  return (
    <>
      <button className="addCollection" onClick={addRepeatCollection}>
        Добавить в повторение слов!
      </button>
    </>
  );
};
