'use client';
import React from 'react';

interface Props {
  code: string;
  setCode: (value: string) => void;
  checkCode: (value: string) => Promise<void>;
  error?: string;
}

export const CodeEnter: React.FC<Props> = ({ code, setCode, checkCode, error }) => {
  return (
    <>
      <div className="card__form-box">
        <label className="card__label card__label-send-verify" htmlFor="code">
          Введите код
        </label>
        <input
          name="code"
          type="text"
          className="card__input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
      </div>

      <div className="card__form-box">
        <button
          className="card__form-btn"
          type="button"
          onClick={() => checkCode(code)}
          disabled={code === ''}>
          Сбросить пароль!
        </button>

        {error && <p className="login__form-err">{error}</p>}
      </div>
    </>
  );
};
