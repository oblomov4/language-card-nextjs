'use client';

import React from 'react';
import Link from 'next/link';
import { registerUser } from '@/app/actions';

export const RegisterForm: React.FC = () => {
  const [state, formAction] = React.useActionState(registerUser, {});

  return (
    <div className="login__wrapper">
      <h2 className="login__title">Регистрация</h2>
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
          <label className="login__form-label" htmlFor="name">
            Введите Имя
          </label>
          <input
            placeholder="Введите Ваш логин"
            className="login__form-input"
            type="text"
            id="name"
            name="name"
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
          <label className="login__form-label" htmlFor="password1">
            Подтвердите пароль
          </label>
          <input
            placeholder="Введите Ваш пароль"
            className="login__form-input"
            type="password"
            id="password1"
            name="password1"
            required
          />
        </div>

        <div className="login__form-box">
          <button className="login__form-btn" type="submit">
            Войти
          </button>

          <Link href="/" className="login__form-link">
            Вернуться на главную
          </Link>
        </div>

        {state.errors?.confirmPassword &&
          state.errors.confirmPassword.map((item, index) => (
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

        {state.errors?.email &&
          state.errors.email.map((item, index) => (
            <p className="login__form-err" key={index}>
              {item}
            </p>
          ))}

        {state.errors?.fullName &&
          state.errors.fullName.map((item, index) => (
            <p className="login__form-err" key={index}>
              {item}
            </p>
          ))}

        {state.message && <p className="login__form-err">{state.message}</p>}
      </form>
    </div>
  );
};
