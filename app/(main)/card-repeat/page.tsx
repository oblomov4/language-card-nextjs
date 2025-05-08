import { auth } from '@/auth';
import { LoadingContent, TestForm, TestRepeatCardsWrapper } from '@/shared/components';
import { isValidLanguage } from '@/shared/lib/utils';
import { Suspense } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Language Card - Повтор Слов',
};

export default async function Page({
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
    <>
      <div className="container">
        <h2 className="title">Повторение слов</h2>
        <TestForm />
        {isRender && (
          <Suspense fallback={<LoadingContent width={100} />}>
            <TestRepeatCardsWrapper
              cardCount={cardCount}
              cardLanguage={cardLanguage}
              session={session}
            />
          </Suspense>
        )}
      </div>
    </>
  );
}
