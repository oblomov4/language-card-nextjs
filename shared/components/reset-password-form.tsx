'use client';

import React from 'react';
import { queryApi } from '../lib/utils';
import { useRouter } from 'next/navigation';

interface Props {
  className?: string;
}

type ServerStateType = {
  errors?: {
    confirmPassword?: string[];
  };
  messageError?: string;
  changedPassword?: boolean;
};

export const ResetPasswordForm: React.FC<Props> = () => {
  const router = useRouter();
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');

  const [serverState, setServerState] = React.useState<ServerStateType>({});

  async function handleResetPassword() {
    try {
      const resetPasswordObj = {
        password,
        confirmPassword,
      };

      const res = await queryApi('/api/reset-password', resetPasswordObj);

      console.log(res);

      setServerState(res);
    } catch (err) {
      console.log(err);

      setServerState({
        messageError: 'Что-то пошло не так!',
      });
    }
  }

  React.useEffect(() => {
    if (serverState.changedPassword) {
      router.push('/changed-password');
    }
  }, [serverState, router]);

  return (
    <>
      <div className="card__form-box">
        <label className="card__label" htmlFor="eng">
          Введите новый пароль
        </label>
        <input
          type="password"
          className="card__input"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value.trim())}
        />
      </div>

      <div className="card__form-box">
        <label className="card__label" htmlFor="clue">
          Повторите пароль
        </label>
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value.trim())}
          type="password"
          className="card__input"
          id="clue"
          name="clue"
        />
      </div>

      <div className="card__form-box">
        <button
          className="card__form-btn"
          type="button"
          onClick={handleResetPassword}
          disabled={confirmPassword == '' || password == ''}>
          Сменить пароль
        </button>

        {serverState.errors?.confirmPassword &&
          serverState.errors.confirmPassword.map((item, index) => (
            <p className="login__form-err" key={index}>
              {item}
            </p>
          ))}

        {serverState.messageError && <p className="login__form-err">{serverState.messageError}</p>}
      </div>
    </>
  );
};
