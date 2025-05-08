'use client';

import React from 'react';
import { ServerResponseType } from '../lib/difinitions';
import { queryApi } from '../lib/utils';

interface Props {
  wordOne: string;
  wordClue: string | null;
  wordTwo: string;
  id: number;
}

type InputType = {
  wordOne: string;
  wordClue: string;
  wordTwo: string;
};

export const Card: React.FC<Props> = ({ wordOne, wordClue, wordTwo, id }) => {
  const [showForm, setShowForm] = React.useState<boolean>(false);
  const [input, setInput] = React.useState<InputType>({
    wordOne: '',
    wordClue: '',
    wordTwo: '',
  });
  const [serverDeleteMessage, setServerDeleteMessage] = React.useState<ServerResponseType>({});
  const [serverMessage, setServerMessage] = React.useState<ServerResponseType>({});

  function handleChangeInput(
    e: React.ChangeEvent<HTMLInputElement>,
    word: 'wordOne' | 'wordTwo' | 'wordClue',
  ) {
    setInput({
      ...input,
      [word]: e.target.value.toLowerCase(),
    });
  }


  async function handleClickDelete() {
    setServerDeleteMessage({});
    try {
      const res = await queryApi('/api/card-delete', { id: id });
      setServerDeleteMessage({
        ...res,
      });
    } catch (err) {
      console.log(err);
      setServerDeleteMessage({
        err: 'Что-то пошло не так!',
      });
    }
  }


  async function handleClickSave() {
    setServerMessage({});

    const cardUserChanged = {
      id: id,
      ...input,
    };
    try {
      console.log('Начинаю работать');

      const res = await queryApi('/api/card-change/', cardUserChanged);

      setServerMessage({
        ...res,
      });
    } catch (err) {
      console.log(err);

      setServerMessage({
        err: 'Что-то пошло не так!',
      });
    }
  }

  const saveDisabled: boolean = input.wordClue == '' && input.wordOne == '' && input.wordTwo == '';

  const cssClass = serverMessage?.success
    ? {
        backgroundColor: 'gainsboro',
        border: '2px solid green',
      }
    : serverDeleteMessage?.success && { backgroundColor: 'gainsboro', border: '2px solid red' };

  return (
    <div className="look" style={cssClass || {}}>
      <div className="look__wrapper">
        <span className="look__wrapper-span">Eng:</span>
        <span
          className="look__wrapper-word"
          style={input.wordOne != '' ? { textDecoration: 'line-through' } : {}}>
          {wordOne}
        </span>
        <span className="look__wrapper-word">{input.wordOne}</span>
      </div>
      <div className="look__wrapper">
        <span className="look__wrapper-span">Clue:</span>
        <span
          className="look__wrapper-word"
          style={input.wordClue != '' ? { textDecoration: 'line-through' } : {}}>
          {wordClue}
        </span>
        <span className="look__wrapper-word">{input.wordClue}</span>
      </div>
      <div className="look__wrapper">
        <span className="look__wrapper-span">Ru:</span>
        <span
          className="look__wrapper-word"
          style={input.wordTwo != '' ? { textDecoration: 'line-through' } : {}}>
          {wordTwo}
        </span>
        <span className="look__wrapper-word">{input.wordTwo}</span>
      </div>

      {!showForm && (
        <>
          <div className="look__button-wrapper">
            <button
              className="look__form-change"
              onClick={() => setShowForm(true)}
              disabled={serverDeleteMessage.success != null}>
              Изменить
            </button>
            <button className="look__form-delete" onClick={handleClickDelete}>
              Удалить
            </button>
          </div>
          <h2 className="succes-server">{serverDeleteMessage.success}</h2>
          <h2 className="error-server">{serverDeleteMessage.err}</h2>
        </>
      )}

      {showForm && (
        <div className="look__wrapper--form">
          <div className="look__form">
            <input
              className="look__form-input"
              type="text"
              value={input.wordOne}
              disabled={serverMessage.success != null}
              onChange={(e) => handleChangeInput(e, 'wordOne')}
            />

            <input
              className="look__form-input"
              type="text"
              value={input.wordClue}
              disabled={serverMessage.success != null}
              onChange={(e) => handleChangeInput(e, 'wordClue')}
            />

            <input
              className="look__form-input"
              type="text"
              value={input.wordTwo}
              disabled={serverMessage.success != null}
              onChange={(e) => handleChangeInput(e, 'wordTwo')}
            />
            <button
              className="look__form-save"
              onClick={() => handleClickSave()}
              disabled={saveDisabled}>
              Сохранить
            </button>
            <button className="look__form-change" onClick={() => setShowForm(false)}>
              Скрыть
            </button>
          </div>

          <h2 className="succes-server">{serverMessage.success}</h2>
          <h2 className="error-server">{serverMessage.err}</h2>
        </div>
      )}
    </div>
  );
};
