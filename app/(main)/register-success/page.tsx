import Link from 'next/link';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Language Card - Вы успешно зарегистрировались',
};

export default function RegisterSuccessPage() {
  return (
    <>
      <div className="container">
        <h2 className="title">Вы успешно прошли регистрацию!</h2>
        <p className="register-success-descr">
          Остался всего один шаг до того как вы сможете полноценно пользоваться сайтом! На ваш
          E-mail адрес было выслано письмо для подтверждения аккаунта. Обычно письмо приходит в
          течение 5-10 минут.
        </p>
        <p className="register-success-descr">(Письмо могло попасть в папку спам)</p>
        <div className="register-success-link-box">
          <Link className="register-success-link" href="send-verify-code">
            Нажмите сюда если ссылка не приходит
          </Link>
        </div>
      </div>
    </>
  );
}
