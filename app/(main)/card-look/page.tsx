import { auth } from '@/auth';
import { CardLookWrapper, LoadingContent } from '@/shared/components';
import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Language Card - Просмотр Карт',
};

export default async function CardLookPage() {
  const session = await auth();

  if (!session) {
    return <h2 className="title">Требуется войти в аккаунт!</h2>;
  }

  return (
    <div className="container">
      <h2 className="title">Просмотр карточек</h2>
      <Suspense fallback={<LoadingContent width={100} />}>
        <CardLookWrapper session={session} />
      </Suspense>
    </div>
  );
}
