import { db } from '@/db';
import { cards, SelectCard } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Session } from 'next-auth';
import React from 'react';
import { getUserCountCard, shuffle } from '../lib/utils';
import Link from 'next/link';
import { TestRepeatCard } from './test-repeat-card';

interface Props {
  cardCount: string;
  cardLanguage: string;
  session: Session;
}

export const TestRepeatCardsWrapper: React.FC<Props> = async ({
  cardCount,
  cardLanguage,
  session,
}) => {
  let enoughCard: boolean = true;
  let userTestCards: SelectCard[] | undefined;
  const countCardUser: number = await db.$count(cards, eq(cards.userId, Number(session.user.id)));

  if (getUserCountCard(cardCount) > countCardUser) {
    enoughCard = false;
  }

  if (enoughCard) {
    if (cardCount === 'all') {
      const res = await db.query.repeatCards.findMany({
        where: (repeatCards, { eq }) => eq(repeatCards.userId, Number(session.user.id)),
        with: {
          cards: true,
        },
      });

      userTestCards = res.map((item) => item.cards);

      shuffle(userTestCards);
    }

    if (cardCount === '10last') {
      const res = await db.query.repeatCards.findMany({
        where: (repeatCards, { eq }) => eq(repeatCards.userId, Number(session.user.id)),
        with: {
          cards: true,
        },
        orderBy: (repeatCards, { desc }) => [desc(repeatCards.id)],
        limit: 10,
      });

      userTestCards = res.map((item) => item.cards);
    }

    if (cardCount === '20last') {
      const res = await db.query.repeatCards.findMany({
        where: (repeatCards, { eq }) => eq(repeatCards.userId, Number(session.user.id)),
        with: {
          cards: true,
        },
        orderBy: (repeatCards, { desc }) => [desc(repeatCards.id)],
        limit: 20,
      });

      userTestCards = res.map((item) => item.cards);
    }
    if (cardCount === '30last') {
      const res = await db.query.repeatCards.findMany({
        where: (repeatCards, { eq }) => eq(repeatCards.userId, Number(session.user.id)),
        with: {
          cards: true,
        },
        orderBy: (repeatCards, { desc }) => [desc(repeatCards.id)],
        limit: 30,
      });

      userTestCards = res.map((item) => item.cards);
    }
    if (cardCount === '10') {
      const res = await db.query.repeatCards.findMany({
        where: (repeatCards, { eq }) => eq(repeatCards.userId, Number(session.user.id)),
        with: {
          cards: true,
        },
      });

      userTestCards = res.map((item) => item.cards);

      shuffle(userTestCards);
      userTestCards.length = 10;
    }
    if (cardCount === '20') {
      const res = await db.query.repeatCards.findMany({
        where: (repeatCards, { eq }) => eq(repeatCards.userId, Number(session.user.id)),
        with: {
          cards: true,
        },
      });

      userTestCards = res.map((item) => item.cards);

      shuffle(userTestCards);
      userTestCards.length = 20;
    }
    if (cardCount === '30') {
      const res = await db.query.repeatCards.findMany({
        where: (repeatCards, { eq }) => eq(repeatCards.userId, Number(session.user.id)),
        with: {
          cards: true,
        },
      });

      userTestCards = res.map((item) => item.cards);

      shuffle(userTestCards);
      userTestCards.length = 30;
    }
  }

  return (
    <>
      {userTestCards &&
        userTestCards.map((card) => (
          <TestRepeatCard
            key={card.id}
            wordOne={card.wordOne}
            wordClue={card.wordClue}
            wordTwo={card.wordTwo}
            wordLanguage={cardLanguage}
            id={card.id}
          />
        ))}
      {!userTestCards && cardCount && (
        <h2 className="subtitle">В вашей коллекции недостаточно карт!</h2>
      )}
      {userTestCards && (
        <div className="endTest">
          <Link className="endTest__button" href="/card-repeat">
            Закончить тестирование
          </Link>
        </div>
      )}
    </>
  );
};
