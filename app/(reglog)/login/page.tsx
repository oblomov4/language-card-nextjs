import { MainLogin } from "@/shared/components";

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Language Card - Войти в аккаунт',
};

export default function LoginPage() {
  return <MainLogin />;
}
