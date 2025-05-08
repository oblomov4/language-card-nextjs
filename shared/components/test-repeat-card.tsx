'use client';
import React from 'react';
import { ServerResponseType } from '../lib/difinitions';
import { queryApi } from '../lib/utils';
import { LoadingContent } from './loading-content';

interface Props {
  wordOne: string;
  wordClue: string;
  wordTwo: string;
  wordLanguage: string;
  id: number;
}

export const TestRepeatCard: React.FC<Props> = ({
  wordOne,
  wordClue,
  wordTwo,
  wordLanguage,
  id,
}) => {
  const [input, setInput] = React.useState<string>('');
  const [isTruth, setIsTruth] = React.useState<string>('');
  const [responseUser, setResponseUser] = React.useState<string>('');
  const [showWord, setShowWord] = React.useState<boolean>(true);
  const [serverResponseClient, setServerResponseClient] = React.useState<ServerResponseType>({});
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  function checkWord() {
    setShowWord(false);
  }

  async function cardCorrect() {
    try {
      setIsLoading(true);
      const res = await queryApi('/api/card-repeat', { id: id });
      setIsTruth('ok');
      setResponseUser('Вы ответили правильн!');

      setServerResponseClient(res);
    } catch (err) {
      console.log(err);

      setServerResponseClient({
        err: 'На сервере что-то пошло не так!',
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function checkAnswer() {
    if (wordLanguage === 'eng') {
      if (input === wordTwo) {
        try {
          setIsLoading(true);
          setIsTruth('ok');
          setResponseUser('Вы ответили правильно!');
          const res = await queryApi('/api/card-repeat', { id: id });
          setServerResponseClient(res);
        } catch (err) {
          console.log(err);

          setServerResponseClient({
            err: 'На сервере что-то пошло не так!',
          });
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsTruth('no');
        setResponseUser('Вы ответили неправильно!');
      }
    }
    if (wordLanguage === 'ru') {
      if (input === wordOne) {
        try {
          setIsLoading(true);
          setIsTruth('ok');
          setResponseUser('Вы ответили правильно!');
          const res = await queryApi('/api/card-repeat', { id: id });
          setServerResponseClient(res);
        } catch (err) {
          console.log(err);
          setServerResponseClient({
            err: 'На сервере что-то пошло не так!',
          });
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsTruth('no');
        setResponseUser('Вы ответили неправильно!');
      }
    }
  }

  return (
    <div className={`look ${isTruth}`}>
      <div className="look__wrapper">
        <span className="look__wrapper-span">{wordLanguage == 'eng' ? 'Eng:' : 'Ru:'}</span>
        <span className="look__wrapper-word">{wordLanguage == 'eng' ? wordOne : wordTwo}</span>
      </div>
      <div className="look__wrapper">
        <span className="look__wrapper-span">Clue:</span>
        <span className="look__wrapper-word">{wordClue}</span>
      </div>
      <div className="look__wrapper" hidden={showWord}>
        <span className="look__wrapper-span">{wordLanguage == 'eng' ? 'Ru:' : 'Eng:'}</span>
        <span className="look__wrapper-word">{wordLanguage == 'eng' ? wordTwo : wordOne}</span>
      </div>
      <input
        type="text"
        className="answer"
        value={input}
        onChange={(e) => setInput(e.target.value.toLowerCase())}
      />
      <button className="check" onClick={checkAnswer} disabled={input == ''}>
        Проверить!
      </button>
      {responseUser != '' && (
        <button className="check" onClick={checkWord}>
          Смотреть слово!
        </button>
      )}

      {responseUser != '' && (
        <button className="check" onClick={cardCorrect}>
          Слово правильное!
        </button>
      )}

      {isTruth === 'ok' && (
        <h2 style={{ fontSize: '17px', color: 'green', fontWeight: '700', marginTop: '20px' }}>
          {responseUser}
        </h2>
      )}

      {isTruth === 'no' && (
        <h2 style={{ fontSize: '17px', color: 'red', fontWeight: '700', marginTop: '20px' }}>
          {responseUser}
        </h2>
      )}

      {serverResponseClient.success && (
        <h2
          style={{
            fontSize: '20px',
            color: 'green',
            fontWeight: '700',
            marginTop: '20px',
            textAlign: 'center',
          }}>
          {serverResponseClient.success}
        </h2>
      )}

      {isLoading && <LoadingContent width={50} />}
      {serverResponseClient.err && <h2 className="error-server">{serverResponseClient.err}</h2>}
    </div>
  );
};
