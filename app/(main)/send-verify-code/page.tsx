import { SendVerifyCodeForm } from '@/shared/components';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Language Card - Верификация',
};

export default function SendVerifyCodePage() {
  return <SendVerifyCodeForm />;
}
