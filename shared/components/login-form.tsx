'use client';

import { loginUser } from '@/app/actions';
import Link from 'next/link';
import React from 'react';

export const LoginForm: React.FC = () => {
  const [state, formAction] = React.useActionState(loginUser, {});

  return (
    <form className="login__form" action={formAction}>
      <div className="login__form-box">
        <label className="login__form-label" htmlFor="email">
          Email
        </label>
        <input
          placeholder="Введите Ваш email"
          className="login__form-input"
          type="email"
          id="email"
          name="email"
          required
        />
      </div>

      <div className="login__form-box">
        <label className="login__form-label" htmlFor="password">
          Пароль
        </label>
        <input
          placeholder="Введите Ваш пароль"
          className="login__form-input"
          type="password"
          id="password"
          name="password"
          required
        />
      </div>
      <div className="login__form-box">
        <button className="login__form-btn" type="submit">
          Войти
        </button>
      </div>

      {state.errors?.email &&
        state.errors.email.map((item, index) => (
          <p className="login__form-err" key={index}>
            {item}
          </p>
        ))}

      {state.errors?.password &&
        state.errors.password.map((item, index) => (
          <p className="login__form-err" key={index}>
            {item}
          </p>
        ))}

      {state.message && (
        <>
          <p className="login__form-err">{state.message}</p>
          <Link href="/forgot-password" className="login__form-link forgot-password-link">
            Забыли пароль?
          </Link>
        </>
      )}
      {state.account && (
        <>
          <p className="login__form-err">{state.account}</p>
          <Link className="login__form-acc" href="/send-verify-code">
            Нажмите, чтобы подтвердить аккаунт!
          </Link>
        </>
      )}
    </form>
  );
};
