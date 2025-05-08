import { ForgotPasswordForm } from '@/shared/components';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Language Card - Забыли пароль',
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
