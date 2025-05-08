'use client';

import React from 'react';
import { queryApi } from '../lib/utils';
import { LoadingResetPassword } from './loading-reset-password';
import { CodeEnter } from './code-enter';
import { ResetPasswordForm } from './reset-password-form';

type ServerCheckCodeType = {
  error?: string;
  success?: boolean;
};

export const ResetPasswordWrapper: React.FC = () => {
  const [code, setCode] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [serverCheckCode, setServerCheckCode] = React.useState<ServerCheckCodeType>({
    success: false,
  });

  async function checkCode(code: string): Promise<void> {
    try {
      setIsLoading(true);
      const res = await queryApi('/api/check-code', { code });
      setServerCheckCode(res);
    } catch (err) {
      console.log(err);
      setServerCheckCode({
        error: 'Что-то пошло не так попробуйте позже!',
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return (
      <div className="container">
        <div className="card">
          <div className="card__form">
            <LoadingResetPassword width={100} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card__form">
          {!serverCheckCode.success && (
            <CodeEnter
              code={code}
              setCode={setCode}
              checkCode={checkCode}
              error={serverCheckCode.error}
            />
          )}
          {serverCheckCode.success && <ResetPasswordForm />}
        </div>
      </div>
    </div>
  );
};
