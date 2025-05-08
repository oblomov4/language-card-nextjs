import React from 'react';

import { type Session } from 'next-auth';
import { db } from '@/db';
import { cards, SelectCard } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { getUserCountCard, shuffle } from '../lib/utils';
import { TestCardsParent } from './test-cards-parent';

interface Props {
  session: Session;
  cardCount: string;
  cardLanguage: string;
}

export const TestCardsWrapper: React.FC<Props> = async ({ session, cardCount, cardLanguage }) => {
  let enoughCard: boolean = true;
  let userTestCards: SelectCard[] | undefined;
  const countCardUser: number = await db.$count(cards, eq(cards.userId, Number(session.user.id)));

  if (getUserCountCard(cardCount) > countCardUser) {
    enoughCard = false;
  }

  if (enoughCard) {
    if (cardCount === 'all') {
      userTestCards = await db
        .select()
        .from(cards)
        .where(eq(cards.userId, Number(session.user.id)));
      shuffle(userTestCards);
    }
    if (cardCount === '10last') {
      userTestCards = await db
        .select()
        .from(cards)
        .where(eq(cards.userId, Number(session.user.id)))
        .orderBy(desc(cards.id))
        .limit(10);
    }

    if (cardCount === '20last') {
      userTestCards = await db
        .select()
        .from(cards)
        .where(eq(cards.userId, Number(session.user.id)))
        .orderBy(desc(cards.id))
        .limit(20);
    }
    if (cardCount === '30last') {
      userTestCards = await db
        .select()
        .from(cards)
        .where(eq(cards.userId, Number(session.user.id)))
        .orderBy(desc(cards.id))
        .limit(30);
    }
    if (cardCount === '10') {
      userTestCards = await db
        .select()
        .from(cards)
        .where(eq(cards.userId, Number(session.user.id)));
      shuffle(userTestCards);
      userTestCards.length = 10;
    }
    if (cardCount === '20') {
      userTestCards = await db
        .select()
        .from(cards)
        .where(eq(cards.userId, Number(session.user.id)));
      shuffle(userTestCards);
      userTestCards.length = 20;
    }
    if (cardCount === '30') {
      userTestCards = await db
        .select()
        .from(cards)
        .where(eq(cards.userId, Number(session.user.id)));
      shuffle(userTestCards);
      userTestCards.length = 30;
    }
  }

  return (
    <>
      {userTestCards && (
        <TestCardsParent userTestCards={userTestCards} wordLanguage={cardLanguage} />
      )}
      {!userTestCards && <h2 className="subtitle">В вашей коллекции недостаточно карт!</h2>}
    </>
  );
};
