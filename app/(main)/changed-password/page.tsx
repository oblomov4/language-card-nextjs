import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Language Card - Ваш пароль был изменен',
};

export default function ChangedPassword() {
  return (
    <div className="container">
      <h2 className="descr">Ваш пароль был изменен теперь вы можете войти в аккаунт!</h2>
    </div>
  );
}
