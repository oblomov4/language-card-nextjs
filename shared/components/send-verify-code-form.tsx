'use client';
import React from 'react';
import { sendCode } from '@/app/actions';

export const SendVerifyCodeForm: React.FC = () => {
  const [state, formAction] = React.useActionState(sendCode, {});

  return (
    <div className="container">
      <div className="card">
        <form className="card__form" action={formAction}>
          <div className="card__form-box">
            <label className="card__label card__label-send-verify" htmlFor="eng">
              Введите вашу почту
            </label>
            <input type="email" id="email" name="email" className="card__input" required />
          </div>

          <div className="card__form-box">
            <button className="card__form-btn" type="submit">
              Отправить код на почту!
            </button>
          </div>

          {state.errors?.email &&
            state.errors?.email.map((item, index) => (
              <p className="login__form-err" key={index}>
                {item}
              </p>
            ))}

          {state.serverError && <p className="login__form-err">{state.serverError}</p>}
          {state.serverSuccess && <p className="login__form-success">{state.serverSuccess}</p>}
        </form>
      </div>
    </div>
  );
};
