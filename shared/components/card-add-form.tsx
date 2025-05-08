'use client';

import React from 'react';
import { cardAdd } from '@/app/actions';

export const CardAddForm: React.FC = () => {
  const [state, formAction] = React.useActionState(cardAdd, {});

  return (
    <form className="card__form" action={formAction}>
      <div className="card__form-box">
        <label className="card__label" htmlFor="eng">
          Eng
        </label>
        <input type="text" className="card__input" id="eng" name="eng" required />
      </div>

      <div className="card__form-box">
        <label className="card__label" htmlFor="clue">
          Clue
        </label>
        <input type="text" className="card__input" id="clue" name="clue" />
      </div>

      <div className="card__form-box">
        <label className="card__label" htmlFor="ru">
          Ru
        </label>
        <input type="text" className="card__input" id="ru" name="ru" required />
      </div>

      <div className="card__form-box">
        <button className="card__form-btn" type="submit">
          Добавить Карту
        </button>
      </div>

      {state.errors?.wordOne &&
        state.errors.wordOne.map((item, index) => (
          <p className="login__form-err" key={index}>
            {item}
          </p>
        ))}

      {state.errors?.wordTwo &&
        state.errors.wordTwo.map((item, index) => (
          <p className="login__form-err" key={index}>
            {item}
          </p>
        ))}

      {state?.message && <p className="login__form-err">{state.message}</p>}
      {state?.success && <p className="card__success">{state.success}</p>}
    </form>
  );
};
