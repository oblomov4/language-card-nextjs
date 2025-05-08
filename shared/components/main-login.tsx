import React from 'react';
import Link from 'next/link';
import { LoginForm } from './login-form';
import { OtherSosialNetworks } from './other-sosial-networks';

export const MainLogin: React.FC = () => {
  return (
    <div className="login__wrapper">
      <h2 className="login__title">Войти в аккаунт</h2>
      <LoginForm />

      <OtherSosialNetworks />

      <Link href="/" className="login__form-link">
        Вернуться на главную
      </Link>
    </div>
  );
};
