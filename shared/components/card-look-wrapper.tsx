import React from 'react';
import type { Session } from 'next-auth';
import { db } from '@/db';
import { SelectCard } from '@/db/schema';
import { Card } from './card';

interface Props {
  session: Session;
}

export const CardLookWrapper: React.FC<Props> = async ({ session }) => {
  const userCards: SelectCard[] = await db.query.cards.findMany({
    where: (cards, { eq }) => eq(cards.userId, Number(session.user.id)),
  });

  if (userCards.length == 0) {
    return <h2 className="subtitle">Ваша коллекция карт пуста!</h2>;
  }

  return (
    <>
      {userCards.map((card) => {
        return (
          <Card
            key={card.id}
            wordOne={card.wordOne}
            wordTwo={card.wordTwo}
            wordClue={card.wordClue}
            id={card.id}
          />
        );
      })}
    </>
  );
};
