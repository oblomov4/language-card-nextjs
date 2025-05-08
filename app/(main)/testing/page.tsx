import { auth } from '@/auth';
import { LoadingContent, TestCardsWrapper, TestForm } from '@/shared/components';
import { isValidLanguage } from '@/shared/lib/utils';
import { Suspense } from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Language Card - Тестирование',
};

export default async function TestingPage({
  searchParams,
}: {
  searchParams: Promise<{
    cardCount: string;
    cardLanguage: string;
  }>;
}) {
  const session = await auth();
  if (!session) {
    return <h2 className="title">Требуется войти в аккаунт!</h2>;
  }

  const { cardCount, cardLanguage } = await searchParams;

  const isRender = cardCount && cardLanguage && isValidLanguage(cardLanguage);

  return (
    <div className="container">
      <h2 className="title">Тестирование</h2>
      <TestForm />

      {isRender && (
        <Suspense fallback={<LoadingContent width={100} />}>
          <TestCardsWrapper session={session} cardCount={cardCount} cardLanguage={cardLanguage} />
        </Suspense>
      )}
    </div>
  );
}
