import React from 'react';

interface Props {
  wordOne: string;
  wordClue: string;
  wordTwo: string;
  id: number;
  wordLanguage: string;
  truth: number[];
  setTruth: (value: number[]) => void;
}

export const TestCard: React.FC<Props> = ({
  wordOne,
  wordClue,
  wordTwo,
  id,
  wordLanguage,
  setTruth,
  truth,
}) => {
  const [answer, setAnswer] = React.useState<string>('');
  const [userResponse, setUserResponse] = React.useState<string>('');
  const [showResult, setShowResult] = React.useState<string>('');
  const [showWord, setShowWord] = React.useState<boolean>(true);


  function checkWord() {
    setShowWord(false);
  }

  function cardCorrect() {
    setUserResponse('ok');
    setShowResult('Вы ответили правильно!');
    setTruth([...truth, id]);
  }

  function checkAnswer() {
    if (wordLanguage === 'eng') {
      if (answer.trim() === wordTwo) {
        setTruth([...truth, id]);
        setUserResponse('ok');
        setShowResult('Вы ответили правильно!');
      } else {
        setUserResponse('no');
        setShowResult('Вы ответили неправильно!');
      }
    }
    if (wordLanguage === 'ru') {
      if (answer.trim() === wordOne) {
        setTruth([...truth, id]);
        setUserResponse('ok');
        setShowResult('Вы ответили правильно!');
      } else {
        setUserResponse('no');
        setShowResult('Вы ответили неправильно!');
      }
    }
  }

  return (
    <div className={`look ${userResponse}`}>
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
        value={answer}
        onChange={(e) => setAnswer(e.target.value.toLowerCase())}
      />
      <button className="check" onClick={checkAnswer} disabled={userResponse != ''}>
        Проверить!
      </button>
      {userResponse != '' && (
        <button className="check" onClick={checkWord}>
          Смотреть слово!
        </button>
      )}
      {userResponse != '' && (
        <button className="check" onClick={cardCorrect}>
          Слово правильное!
        </button>
      )}
      {userResponse === 'ok' && (
        <h2 style={{ fontSize: '17px', color: 'green', fontWeight: '700', marginTop: '20px' }}>
          {showResult}
        </h2>
      )}
      {userResponse === 'no' && (
        <h2 style={{ fontSize: '17px', color: 'red', fontWeight: '700', marginTop: '20px' }}>
          {showResult}
        </h2>
      )}
    </div>
  );
};
