import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Language Card - Вы успешно зарегистрировались',
};

export default function VerifiedPage() {
  return (
    <div className="container">
      <h2 className="title">Поздравляем! Вы успешно зарегистрировалиcь.</h2>
      <p className="descr">Теперь можете войти в свой аккаунт!</p>
    </div>
  );
}
