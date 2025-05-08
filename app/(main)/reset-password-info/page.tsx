import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Language Card - Информация о востонавление пароля',
};

export default function ResetPasswordInfoPage() {
  return (
    <div className="container">
      <h2 className="descr">На ваш E-mail была отправлена инструкция для смены пароля!</h2>
      <br />
      <h2 className="reset-password-info-descr">
        Обратите внимание на то что письмо может прийти в течение 5-10 минут.
      </h2>
      <br />
      <h2 className="reset-password-info-support">
        Если письмо так и не приходит, напишите в поддержку vlad.serebrov@yandex.ru
      </h2>
    </div>
  );
}
