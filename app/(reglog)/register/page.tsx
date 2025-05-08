import { RegisterForm } from '@/shared/components';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Language Card - Регистрация',
};

export default function RegisterPage() {
  return <RegisterForm />;
}
