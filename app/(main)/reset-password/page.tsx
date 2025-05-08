import { ResetPasswordWrapper } from '@/shared/components';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Language Card - Сбросить пароль',
};

export default function ResetPasswordPage() {
  return <ResetPasswordWrapper />;
}
